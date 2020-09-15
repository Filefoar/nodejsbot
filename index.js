const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == 'LAT') {
    let img = 'https://cdn.discordapp.com/attachments/650522596516823088/755306819337060452/AATXAJwxm35wnchyOoMI4Q-lod-XigMpyoJEl_Wy7H63aws900-c-k-c0xffffffff-no-rj-mo.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('클리오')
      .setURL('https://www.youtube.com/channel/UC3FtkqW0DhaApggXDFbp8yg')
      .setAuthor('YouTube', img, 'https://www.youtube.com/channel/UC3FtkqW0DhaApggXDFbp8yg')
      .setThumbnail(img)
      .addBlankField()
      .addField('클리오 유튜브 채널', '리그 오브 레전드 방송을 주로 합니다.')
      .addField('구독과 팔로우', '해주세요!!', true)
      .addField('게임류', '리그 오브 레전드\n마인크래프트\n기타 등등\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('re.config.bot이 만듬')

    message.channel.send(embed)
  } else if(message.content == 'LZ') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '욕설', desc: '병○, 시○, 씨○, fuck, fucking, ㅈㄹ'},
      {name: '패드립', desc: '느금, 느○마, ㄴㄱㅁ, 니엄'},
      {name: '성드립', desc: '섹○, sex'},
      {name: '기타', desc: 'ㄵ, ㄴㅈ'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('서버 금지단어 목록', helpImg)
      .setColor('#186de6')
      .setFooter(`경고조치 관리봇!`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('서버 금지단어 목록 : ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);