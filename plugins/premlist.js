let handler = async (m, { conn, args }) => {
  let user = Object.entries(global.db.data.users).filter(user => user[1].premium).map(([key, value]) => {
    return { ...value, jid: key }
  })
  let premTime = global.db.data.users[m.sender].premiumTime
    let waktu = clockString(`${premTime - new Date() * 1} `)
  let sortedP = user.map(toNumber('premiumTime')).sort(sort('premiumTime'))
  let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedP.length)
  let { key } = await m.reply(`「 *PREMIUM LIST* 」
${sortedP.slice(0, len).map(({ jid, name, premiumTime, registered }, i) => `▸ ( ${clockString (premiumTime - new Date() * 1)} ) ${registered ? name : conn.getName(jid)}`).join`\n`}
❏────────────────❏`.trim())
  setTimeout(() => {
    if (db.data.chats[m.chat].deletemedia) conn.deleteMessage(m.chat, key)
  }, db.data.chats[m.chat].deletemediaTime)
}
handler.help = ['premlist [angka]']
handler.tags = ['info']
handler.command = /^(listprem|premlist)$/i

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}