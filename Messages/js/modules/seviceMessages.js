/**
 * Created by sve on 15.8.2017 г..
 */
let serveceMessages = (function () {

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }
    
    function listArchiveMessages() {
        let username = sessionStorage.getItem('username')
        let edning = `messages?query={"sender_username":"${username}"}`
        return requester.get('appdata', edning, 'Kinvey')
    }
    function listSendMessages() {
        let username = sessionStorage.getItem('username')
        let edning = `messages?query={"recipient_username":"${username}"}`
        return requester.get('appdata', edning, 'Kinvey')
    }
    
    function deleteMsg(id) {
        let endPoint = 'messages/' + id;
        return requester.remove('appdata', endPoint, 'Kinvey')
    }

    function loadUsrs() {
        let endpoint = '';
        return requester.get('user', endpoint, "Kinvey")
    }

    function sendMsg(senderUsername, senderName, recipientUsername, msgText) {
        let dataMsg = {
            "sender_username": senderUsername,
            "sender_name": senderName,
            "recipient_username" :recipientUsername,
            "text": msgText
        }
        let endpoint = 'messages';
        return requester.post('appdata', endpoint, 'Kinvey', dataMsg)
    }

    return {
        handleError,
        showInfo,
        listSendMessages,
        listArchiveMessages,
        deleteMsg,
        loadUsrs,
        sendMsg
    }
})()