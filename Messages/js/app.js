/**
 * Created by sve on 15.8.2017 г..
 */
$(function () {
    showView('AppHome')
// Handle events
    $('#menu a[data-target]').click(navigateTo);
    $('#formRegister').submit(registerUser);
    $('#formLogin').submit(loginUser);
    $('#formSendMessage').submit(sendMessage)
    $('#linkMenuLogout').click(logoutUser)
    $('#linkUserHomeMyMessages').click(function () {
        showView('MyMessages')
        viewSendMessages()
    })
    $('#linkUserHomeArchiveSent').click(function () {
        showView('ArchiveSent')
        viewArchiveMessages()
    })
    $('#linkUserHomeSendMessage').click(function () {
        showView('SendMessage')
        loadUsers()
    })

    $('#linkMenuMyMessages').click(viewSendMessages)
    $('#linkMenuArchiveSent').click(viewArchiveMessages)
    $('#linkMenuSendMessage').click(loadUsers)


    if(sessionStorage.getItem('authtoken')!== null){
        userLoggedIn()
    }else {
        userLoggedOut()
    }

    function sendMessage(ev) {
        ev.preventDefault()
        let recepianName = $('#msgRecipientUsername').val()
        let msgText = $('#msgText').val();
        let senderUsername= sessionStorage.getItem('username');
        let senderName= sessionStorage.getItem('name')
        serveceMessages.sendMsg(senderUsername, senderName, recepianName, msgText)
            .then(function () {
                serveceMessages.showInfo('Message sent.')
                $('#msgText').val('');
            })
    }
    
    function loadUsers() {
        $('#msgRecipientUsername').empty()
        serveceMessages.loadUsrs()
            .then(function (users) {
                for(let user of users){
                    $('#msgRecipientUsername').append($('<option>').text(user.username))
                }
            })
    }

    function loginUser(ev) {
        ev.preventDefault()
        let username = $('#loginUsername').val();
        let pass = $('#loginPasswd').val();
        auth.login(username, pass)
            .then(function (userInfo) {
                saveSession(userInfo);
                serveceMessages.showInfo('Login successful.')
            }).catch(serveceMessages.handleError)
    }

    function logoutUser() {
        auth.logout()
            .then(function () {
                serveceMessages.showInfo('Logout successful.');
                userLoggedOut();
                sessionStorage.clear()
            })
    }

    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', userInfo['name']);
        userLoggedIn();
    }

    function registerUser(ev) {
        ev.preventDefault()
        let username = $('#registerUsername').val();
        let pass = $('#registerPasswd').val();
        let name = $('#registerName').val();
        auth.register(username, pass, name)
            .then(function (userInfo) {
                saveSession(userInfo);
                serveceMessages.showInfo('User registration successful.')
            }).catch(serveceMessages.handleError)
    }
    
    function userLoggedIn() {
        let username = sessionStorage.getItem('username')
        $('#menu a.useronly').show();
        $('#menu a.anonymous').hide();
        $('#spanMenuLoggedInUser').text(`Welcome, ${username}`)
        $('#viewUserHomeHeading').text(`Welcome, ${username}`)
        $('#spanMenuLoggedInUser').show();
        showView('UserHome')
    }

    function userLoggedOut() {
        $('#spanMenuLoggedInUser').hide()
        $('#menu a.useronly').hide();
        $('#menu a.anonymous').show();
        showView('AppHome')
    }

    function navigateTo() {
        let viewName = $(this).attr('data-target');
        showView(viewName);
    }

    function showView(viewName) {
        $('main > section').hide();
        $('#view' + viewName).show();
    }

    // Handle notifications
    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    function viewArchiveMessages() {
        serveceMessages.listArchiveMessages()
            .then(function (data) {

                //WITH TEMPLATE
                let template = [];
                let context = {msgs:[]};
                $.get('./templates/archiveMessages.html')
                    .then(function (tmp) {
                        template = Handlebars.compile(tmp)
                        for(let msg of data){
                            context.msgs.push({
                                name: msg.recipient_username,
                                msgText: msg.text,
                                date: formatDate(msg._kmd.lmt),
                                id: msg._id
                            })
                        }
                        $('#sentMessages').html(template(context))
                        $('#sentMessages').find('.delete').click(deleteMassage)
                    })

                //NO TAMPLATE
                // let table = $(`<table>
                //                 <thead>
                //                     <tr>
                //                         <th>To</th>
                //                         <th>Message</th>
                //                         <th>Date Received</th>
                //                         <th>Action</th>
                //                     </tr>
                //                 </thead>
                //                 <tbody id="msgs"></tbody>
                //             </table>`);
                //
                // for(let msg of data){
                //     let recipientUsername = msg.recipient_username;
                //     let tr = $(`<tr data-id="${msg._id}">
                //                     <td>${recipientUsername}</td>
                //                     <td>${msg.text}</td>
                //                     <td>${formatDate(msg._kmd.lmt)}</td>
                //                     <td><button class="delete">Delete</button></td>
                //                </tr>`);
                //     table.find('#msgs').append(tr)
                // }
                // $('#sentMessages').empty()
                // $('#sentMessages').append(table)
                // $('#sentMessages').find('.delete').click(deleteMassage)
            })
    }

    function deleteMassage() {
       let id =  $(this).parent().parent().attr('data-id')
       serveceMessages.deleteMsg(id).then(function () {
            serveceMessages.showInfo('Message deleted.')
        });
        $(this).parent().parent().remove()
    }

    function viewSendMessages() {
        serveceMessages.listSendMessages()
            .then(function (data) {
                //WITH TEMPLATE
                let context = {msgs:[]};
                $.get('./templates/MyMessages.html')
                    .then(function (tmp) {
                        let template = Handlebars.compile(tmp)
                        for(let msg of data){
                            context.msgs.push({
                                name: formatSender(msg.sender_username, msg.sender_name ),
                                msgText: msg.text,
                                date: formatDate(msg._kmd.lmt)
                            })
                            $('#myMessages').html(template(context))
                        }
                    })

                //NO TEMPLATE
                // let table = $(`<table>
                //                 <thead>
                //                     <tr>
                //                         <th>From</th>
                //                         <th>Message</th>
                //                         <th>Date Received</th>
                //                     </tr>
                //                 </thead>
                //                 <tbody id="sendMsgs"></tbody>
                //             </table>`);
                //
                // for(let msg of data){
                //     let senderUsername = msg.sender_username;
                //     let senderName = msg.sender_name;
                //     let tr = $(`<tr>
                //                     <td>${formatSender(senderUsername,senderName )}</td>
                //                     <td>${msg.text}</td>
                //                     <td>${formatDate(msg._kmd.lmt)}</td>
                //                </tr>`);
                //
                //     $(table).find('#sendMsgs').append(tr)
                // }
                // $('#myMessages').empty()
                // $('#myMessages').append(table)
            })
    }

    //Helper functions
    function formatDate(dateISO8601) {
        let date = new Date(dateISO8601);
        if (Number.isNaN(date.getDate()))
            return '';
        return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
            "." + date.getFullYear() + ' ' + date.getHours() + ':' +
            padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

        function padZeros(num) {
            return ('0' + num).slice(-2);
        }
    }

    function formatSender(name, username) {
        if (!name)
            return username;
        else
            return username + ' (' + name + ')';
    }
})