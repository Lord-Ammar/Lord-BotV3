let fetch = require('node-fetch')
let handler = async (m, { conn, command, args, text}) => {
  let full = /f$/i.test(command)
  if (!args[0]) return conn.reply(m.chat, 'Tidak ada url', m)
  let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss =  `https://api.lolhuman.xyz/api/ssweb?apikey=rey2k21&url=${text}`
  conn.sendButtonImg(m.chat, await (await fetch(ss)).buffer(), 'Nih kak', global.wm, 'MENU', '.menu', m)
}
handler.help = ['ss', 'ssf'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.limit = 1
handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler