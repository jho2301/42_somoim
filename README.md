# 42SOMOIM <!-- badge needed : build passing, version, -->

<!-- gif -->

## 🚩 table of contents
- Why we made 42Somoim?
- Description
- How To Use
- TRY IT OUT!  <!-- workspace url ours, cuckcu -->
- We are..
- for contributors <!-- -  badge to wiki -->
- Credits
- support
  <!-- buymeacoffe / beapatreon -->

## Why we made 42Somoim?
```42서울 선발과정 당시 참가자들이 모인 슬랙채널에는 소규모 채널들이 다양하게 존재했습니다. 채널들은 저마다의 특별한 관심사들을 담고 피씨너들을 이어주는 역할을 하고 있었는데요. 하지만 본과정 채널로 옮기는 과정에서 채널들은 사라질 수 밖에 없었습니다. 그것을 지켜보면서 아쉬웠던 저희 팀은 그 문화를 다시 살려볼 수 없을까 궁리 했습니다.```

## Description
> *42내 자유로운 소규모 모임 활성화를 도와주는 슬랙 앱*  

모든 42인들이 속해있는 42born2code 워크스페이스에서 사용할 수 있도록 의도하여 제작했습니다.

42Somoim을 통해 운영자는 캠퍼스별로 소모임에 대한 간단한 설명, 오픈 카톡방 또는 디스코드 링크 등을 등록할 수 있고, 참가자는 소모임 리스트를 조회하여 참가할 수 있습니다.

## How To Use

- 소모임을 시작하고 싶다면..
  - /somoim register
    
- 소모임에 참여하고 싶다면..
  - /somoim list

- 소모임 해쳐!
  - /somoim unregister

## TRY IT OUT!

- [42Somoim workspace](www.naver.com)
- [Cuckoo workspace](www.naver.com)

## We are..
<img src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif" alt="drawing" width="40"/>

  **Captain** Hjeon

![hammond](https://avatars1.githubusercontent.com/u/46372339?s=40&u=a53742cf3f7882978aad4594a5cb650943462aef&v=4)

  **Crew** Hyekim 

<img src="https://ca.slack-edge.com/T039P7U66-UU8UDR1RU-2e2f38959a43-512" alt="drawing" width="40"/> 
 
  **Crew** Dohkim

## For contributors
	Got something interesting you'd like to share? Learn about contributing.

## Credits
- Language
  - `javascript` -> `typescript`
-	Development Tool 
    - `Node.js`, `Bolt`, `slack/web-api`, `sequelize`
- Distribution Tool
	- `AWS RDS`, `AWS EC2`, `Docker`
- Cooperation Tool
  - `github(with gitflow)`, `eslint (code convetion: airbnb)`, `prettier`, `Jira`, `slack`, `hangout`, `vscode liveshare`
- Development Method
  - `Pair Programming`, `Functional Division Development`


# Contribution Guidelines

## Developing

0. Before you start, RTM if you're not ready [Bolt](https://slack.dev/bolt-js/concepts) [SlackAPI](https://api.slack.com/)

1. install package
>```zsh
> $ git clone https://github.com/jho2301/42_Somoim.git
> $ cd 42_Somoim
> $ npm install
> $ npm install -g ts-node
>```
2. set environment varaibles(you can use [dotenv](https://www.npmjs.com/package/dotenv))
- SLACK_SIGNING_SECRET
  - Signing secret from the slack app you created in step 0.
- SLACK_BOT_TOKEN
  - Bot token from the slack app you created in step 0.
- COMMAND
  - you can specify slack command of your app
- DB_DIALECT
  - setting database dialect ex)'postgres'
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_HOST
- PORT

3. run server
```shell
$ ts-node src/index.ts
```

## contributing
1. issue
2. pull request