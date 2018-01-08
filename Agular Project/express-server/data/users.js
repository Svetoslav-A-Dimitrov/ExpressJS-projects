const usersById = {1:{ email: "admin@admin.admin", password: "admin", name: "admin", id: 1}}
const usersByEmail = {"admin@admin.admin": { email: "admin@admin.admin", password: "admin", name: "admin", id: 1}}

module.exports = {
  total: () => Object.keys(usersById).length,
  save: (user) => {
    const id = Object.keys(usersById).length + 1
    user.id = id


    usersById[id] = user
    usersByEmail[user.email] = user
    console.log(usersByEmail)
  },
  findByEmail: (email) => {
    return usersByEmail[email]
  },
  findById: (id) => {
    return usersById[id]
  }
}
