<template>
  <main class="main">
    <div class="header flex-row justify-center">
      <div class="navigation flex-row">
        <div class="logo flex-col"></div>
        <div class="wallet flex-col btn-hand" @click="login(1)"></div>
        <div class="profile flex-col btn-hand" @click="displayProfileInfo()"></div>
      </div>
    </div>
    <div class="container flex-row">
      <!-- nav start -->
      <div class="nav flex-col align-center">
        <div class="outer1 flex-col">
          <div class="bd1 flex-col">
            <div class="outer2 flex-col justify-between">
              <span class="text tbox tline tcolor tprop tfont_m tfont_s26 tshadow" >{{ baseConfig.lang_001 }}</span>
              <div class="box1 flex-row">
                <img class="icon1" referrerpolicy="no-referrer" src="../assets/images/building_logo.png" alt="" />
                <span class="box3 tfont_s30 tfont_m tleft tcolor tprop">{{ gameConfig.total }}</span>
              </div>
            </div>
          </div>
          <div class="bd2 flex-row justify-between">
            <div class="section2 flex-col">
              <div class="section3 flex-row">
                <div class="outer3 flex-col"></div>
                <div class="outer4">
                  <span class="info2">
                    <input type="text" class="number" placeholder="Floor ID" v-model.number="gotoNum"  @keyup.enter="goto()"/>
                  </span>
                </div>
              </div>
            </div>
            <div class="section4 flex-col align-center">
              <span class="txt2 btn-hand" @click="goto()" >{{ baseConfig.lang_003 }}</span>
            </div>
          </div>
          <div class="bd3 flex-row justify-between">
            <div v-bind:class="[!showInfo.myFloor ? 'layer1' : 'layer1_g', 'flex-col']"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow ttop btn-hand"
              v-bind:class="[!showInfo.myFloor ? 'tcolor' : 'tcolor_gray0', 'flex-col']"
              @click="myFloor()">
              {{ baseConfig.lang_004 }}</span>
          </div>
          <div class="bd4 flex-row justify-between">
            <div v-bind:class="[!showInfo.myFollowing ? 'bd5' : 'bd5_g', 'flex-col']"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow ttop btn-hand"
              v-bind:class="[!showInfo.myFollowing ? 'tcolor' : 'tcolor_gray0', 'flex-col']"
              @click="myFollowing()"
              >{{ baseConfig.lang_005 }}</span
            >
          </div>
          <div class="bd4 flex-row justify-between">
            <div v-bind:class="[!showInfo.myFollowed ? 'group0' : 'group0_g', 'flex-col']"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor btn-hand"
              v-bind:class="[!showInfo.myFollowed ? 'tcolor' : 'tcolor_gray0', 'flex-col']"
              @click="myFollowed()"
              >{{ baseConfig.lang_006 }}</span
            >
          </div>
          <div class="bd4 flex-row justify-between">
            <div v-bind:class="[!showInfo.hot ? 'group1' : 'group1_g', 'flex-col']"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor tleft btn-hand"
              v-bind:class="[!showInfo.hot ? 'tcolor' : 'tcolor_gray0', 'flex-col']"
              @click="hot()"
              >{{ baseConfig.lang_007 }}</span>
          </div>
          <div class="bd8 flex-row justify-between">
            <div class="layer2 flex-col align-center btn-hand" @click="mint()">
              <div class="layer3 flex-col justify-between">
                <div class="layer4 flex-col"></div>
                <span class="txt3">
                  {{ baseConfig.lang_008 }}
                </span>
              </div>
            </div>
            <div class="layer5 flex-col align-center">
              <div class="group2 flex-col justify-between btn-hand" @click="room()">
                <img class="label2" referrerpolicy="no-referrer" src="../assets/images/room.png" alt="" />
                <span class="word5">{{ baseConfig.lang_009 }}</span>
              </div>
            </div>
          </div>
          <div class="bd9 flex-row justify-between">
            <div class="group3 flex-col btn-hand" @click="avatar()">
              <div class="box2 flex-col justify-between">
                <div class="mod1 flex-col"></div>
                <span class="word5">{{ baseConfig.lang_010 }}</span>
              </div>
            </div>
            <!--<div class="group4 flex-col btn-hand">
              <span class="paragraph1">{{ baseConfig.lang_011 }}</span>
            </div>
            -->
          </div>
        </div>
      </div>
      <!-- nav end -->

      <!-- content start -->
      <div class="content flex-col" @click="onClick($event)">
        <Building :floors="building.floors" v-on:open-game="openGame"/>
        <!-- ladder start -->
        <div class="ladder flex-col">
          <div class="lmain6 flex-row justify-between">
            <img class="llabel2" referrerpolicy="no-referrer" src="../assets/images/ladder/label.png" alt="" />
            <div class="lbox10 flex-col">
              <div class="lwrap1 flex-col">
                <div class="lmod5 flex-col" @click="increment()">
                  <div class="lmain7 flex-col"></div>
                </div>
                <div class="lmod6 flex-col align-center">
                  <div class="lsection4 flex-col"  :style="lift(building.start)">
                    <div class="lmain8 flex-col align-center">
                      <div class="lwrap2 flex-col"></div>
                    </div>
                  </div>
                </div>
                <div class="lmod7 flex-col align-center" @click="decrement()">
                  <div class="lmod8 flex-col"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ladder end -->
        <!-- chat start -->
        <div class="chat flex-col align-center">
          <div class="clayer5 flex-col"></div>
        </div>
        <!-- chat end -->
        <Popup :show="showInfo.popup" :title="popupInfo.title" :loading="popupInfo.loading" :popuplist="popupInfo.list" />
      </div>
      <!-- content end -->

      <!-- mint start -->
      <div class="shadow" v-if="showInfo.mint" @click="onClick($event)">
        <div id="mint" class="mint flex-col" @click="onClickOutside($event)">
          <div class="block flex-row justify-between">
            <div class="main4 flex-col"></div>
            <div class="main5 flex-col justify-between">
              <span class="txt3">Skyscraper&nbsp;Floor</span>
              <span class="txt4">请输入你需要mint的楼层号</span>
              <!-- <span class="txt4">
                Phanta&nbsp;Bear&nbsp;is&nbsp;a&nbsp;collection&nbsp;of&nbsp;10,000&nbsp;algorithmically&nbsp;generated&nbsp;digital&nbsp;collectibles&nbsp;that&nbsp;double&nbsp;as&nbsp;memebership&nbsp;cards&nbsp;for&nbsp;the&nbsp;Ezek&nbsp;Club.&nbsp;Each&nbsp;Phanta&nbsp;Bear&nbsp;has&nbsp;a&nbsp;unique&nbsp;set&nbsp;of&nbsp;traits&nbsp;and&nbsp;unlocks&nbsp;varying,&nbsp;unique&nbsp;levels&nbsp;of&nbsp;access&nbsp;and&nbsp;perks&nbsp;for&nbsp;its&nbsp;owner.&nbsp;Phanta&nbsp;Bear&nbsp;project&nbsp;was&nbsp;jointly&nbsp;launched&nbsp;by&nbsp;PHANTACi&nbsp;and&nbsp;Ezek
              </span> -->
              <div class="mod2 flex-col justify-center btn-hand">
                <span class="info7" @click="realMint()">MINT</span>
              </div>
            </div>
          </div>
          <div class="block2 flex-col">
            <div class="box13 flex-row">
              <div class="box14">
                <span class="info10">楼层ID</span>
                <span class="info10">Price</span>
                <span class="word9">：</span>
                <span class="word10">
                  <input type="number" class="" placeholder="输入mint的楼层" v-model.number="mint_floor_num">
                </span>
                <!-- <span class="word10">0.26</span>
                <span class="txt5"></span>
                <span class="txt6">ETH</span> -->
              </div>
            </div>
            <!-- <div class="box15 flex-row justify-between">
              <div class="main6 flex-col">
                <div class="group6 flex-col"></div>
              </div>
              <span class="word11">1</span>
              <div class="main7 flex-col">
                <div class="group7 flex-col"></div>
              </div>
            </div>-->
            <img class="pic1" referrerpolicy="no-referrer" src="../assets/images/floor_icon.png" alt=""/>
            <!-- <span class="info11">Amount：</span> -->
          </div>
        </div>
      </div>
      <!-- mint end -->
    </div>

    <!-- profile start -->
    <div class="pcontent flex-col" v-if="showInfo.profile">
      <div class="player5 flex-col">
        <div class="player6 flex-col">
          <div class="player7 flex-col justify-center align-center">
            <div class="player8 flex-row">
              <div class="pmod6 flex-col"><div class="psection11 flex-col"></div></div>
              <span class="pinfo4">My&nbsp;Wallet</span>
              <div class="pmod7 flex-col">
                <div class="player9 flex-col" @click="close()"></div>
              </div>
            </div>
          </div>
          <div class="pwallet flex-col justify-center align-center">
            <div class="pwlayer8 flex-row">
              <div class="pwlogowrapper flex-col">
                <div class="pwlogo flex-col"></div>
              </div>
              <span class="pwaddr">
                <!-- {{ playerInfo.address }} -->
                <input type="text" name="address" id="msg" v-model="playerInfo.address" readonly>
                <input type="button" class="copy" @click="copy" data-clipboard-target="#msg" :value="baseConfig.lang_028" />
              </span>
            </div>
          </div>
          <div class="player10 flex-row">
            <img class="picon2" referrerpolicy="no-referrer" src="../assets/images/collected.png" alt="" />
            <!-- <div class="pgroup3 flex-col"></div> -->
            <img class="pgroup3" referrerpolicy="no-referrer" src="../assets/images/created.png" alt="" />
            <img class="plabel2" referrerpolicy="no-referrer" src="../assets/images/favorited.png" alt="" />
          </div>
          <div class="player11 flex-row">
            <img class="plabel3" referrerpolicy="no-referrer" src="../assets/images/collected_gray.png" alt="" />
            <span class="pword7">collected</span>
            <img class="picon3" referrerpolicy="no-referrer" src="../assets/images/created_gray.png" alt="" />
            <span class="pword8">created</span>
            <img class="picon3" referrerpolicy="no-referrer" src="../assets/images/favorited_gray.png" alt="" />
            <span class="pword9">favorited</span>
          </div>
          <div class="player12 flex-col"></div>
          <div class="player13 flex-col"></div>
          <div class="player14 flex-container" v-for="item in playerInfo.allNfts" :key="item.id">
            <div class="pblock4">
              <div class="player17 flex-col">
                {{item.tokenId}}
                {{item.name}}
                <p v-if="item.image">
                  <img class="pimg1" referrerpolicy="no-referrer" :src="item.image" alt="" />
                </p>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- profile end -->
    <!-- game info start https://elevenzhou.github.io/Space/ -->
    <!-- <Game :show="showInfo.game" :url="gameConfig.gameUrl" @click="click()" /> -->
    <div class="game" v-if="showInfo.game && gameConfig.gameUrl" @click="click()">
      <div class="close" @click="close()"></div>
      <iframe id="game" title="game" :src="gameConfig.gameUrl" :style="windowCompute()"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
    <!-- game info end -->
    <!-- avatar start -->
    <div class="game" v-if="showInfo.avatar && gameConfig.avatarUrl" @click="click()">
      <div class="close" @click="close()"></div>
      <iframe id="avatar" title="avatar" :src="gameConfig.avatarUrl" :style="windowCompute()"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
    <!-- avatar start -->
  </main>
</template>

<script>
import * as ethers from 'ethers'
// import axios from 'axios'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import Clipboard from 'clipboard'

import Popup from '@/components/Popup.vue'
import Building from '@/components/Building.vue'
import sendMessage from '@/utils/Utils.js'
import {
  // ajaxAddFollowerPeople, ajaxAddFollowerToken, ajaxAddTokenInfo,
  ajaxGetHotToken, ajaxGetMyFollower, ajaxGetAllNfts
} from '@/utils/AjaxData.js'

// 服务器地址
// const serverUrl = '47.75.51.251:9950'
// const wsServer = 'ws://' + serverUrl + '/ws'
// const apiServer = 'http://' + serverUrl

export default {
  name: 'Navigator',
  components: { //
    Building: Building,
    Popup: Popup
  },
  data () {
    // initial data
    return {
      // 合约函数
      appContractWriter: this.$Dapp.Bridges.writer,
      appContractReader: this.$Dapp.Bridges.read,

      // 基础配置
      baseConfig: {
        lang_001: 'Total Floor',
        lang_002: 'Search',
        lang_003: 'GO',
        lang_004: 'My Floor',
        lang_005: 'Following',
        lang_006: 'Followed',
        lang_007: 'Hot',
        lang_008: 'Mint',
        lang_009: 'Room',
        lang_010: 'Avatar',
        lang_011: 'Not \n open',
        lang_028: '复制'
      },
      gameConfig: {
        total: 10000,
        // baseUrl: 'https://dontil.github.io/test/',
        baseUrl: 'https://kokoya-game-1308188195.file.myqcloud.com/dress/game/nft/index.html',
        gameUrl: '',
        avatarBaseUrl: 'https://kokoya-game-1308188195.file.myqcloud.com/dress/game/nftAvatar/index.html',
        avatarUrl: '',
        windowHeight: window.innerHeight
      },
      address: '',
      url: window.location.href ? window.location.href : '',
      lang: 'en',
      // 全局数据
      globalInfo: {
        runUpTime: '2019-08-15'
      },
      isShow: true,
      showInfo: {
        mint: false,
        hot: false,
        profile: false,
        game: false,
        avatar: false,
        popup: false,
        myFloor: false, // my nft
        myFollowing: false, // i see
        myFollowed: false // see i
      },
      playerInfo: {
        metamask: '',
        address: '',
        isLogin: false,
        status: 0, // 登录状态值 0: metamask未登录, 1: 获得钱包账号，但游戏数据未返回, 2: 已获取游戏数据 3:已成功注册
        allNfts: [], // all nft
        mintFloorNumId: [], // mint
        mintFloorTokenId: [], // mint
        myFollowing: [],
        myFollowed: []
      },
      floorInfo: {
        hotList: [] // hot
      },
      gotoNum: '',
      setting: {
        loading: '' // loading
      },
      mint_floor_num: '',
      building: {
        first: true,
        page: 12,
        scroll: 0,
        height: 0,
        start: 6,
        floors: []
      },
      popupInfo: {
        title: '',
        loading: false,
        list: []
      }
    }
  },
  props: {
    msg: String
  },
  methods: {
    onClick (e) {
      // console.log('[Main] outside click event', e)
      const _that = this
      _that.resetPopWindow()
    },
    onClickOutside (e) {
      console.log('[Main] onclick outside e ', e)
      e.stopPropagation()
    },
    navi () {
      console.log('[navigator]navi ', this.$Dapp)
    },
    async login (isInit) {
      const _that = this
      console.log('[Main]login ', _that.$Dapp)
      await _that.$Dapp.connect()
      _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
      console.log('[Main]address ', _that.playerInfo.address)

      // set profile
      if (_that.playerInfo.address !== '') {
        _that.playerInfo.isLogin = true
        _that.playerInfo.status = 1

        if (isInit) {
          this.popupMessage('Metamask had connect success')
        }
      }
      const message = {
        source: 'web',
        type: 'updateTitle'
      }
      sendMessage(message)
    },
    resetPopWindow () {
      console.log('[Main][resetPopWindow] start')
      // reset all pop
      for (const item in this.showInfo) {
        this.showInfo[item] = false
      }
    },
    resetMintFloor () {
      // reset all pop
      this.playerInfo.mintFloorNumId = []
      this.playerInfo.mintFloorTokenId = []
    },
    async displayProfileInfo () {
      // show the profile
      const _that = this

      // common login
      _that.login()
      _that.showInfo.profile = true

      // 独立出去
      this.playerInfo.allNfts = await ajaxGetAllNfts(window.ethereum.selectedAddress)
      console.log('[Main][displayProfileInfo]', this.playerInfo.allNfts)
    },
    async mint () {
      console.log('[mint] start')
      await this.login()

      const _that = this
      if (_that.showInfo.mint) {
        _that.showInfo.mint = false
      } else {
        _that.showInfo.mint = true
      }
      // 添加关闭倒计时
    },
    async realMint () {
      if (this.mint_floor_num <= 0) {
        this.popupMessage('请输入正确的楼层号')
        return
      }
      const floorNum = this.mint_floor_num
      const floorPrice = ethers.utils.parseEther('0.1')
      console.log('realmint:::', floorNum, floorPrice)

      // All overrides are optional
      const overrides = {
        // gasLimit: 23000, // default
        // gasPrice: ethers.utils.parseUnits('9.0', 'gwei'), // default
        gasPrice: 20000000000, // default
        value: floorPrice
      }
      await this.$Dapp.Bridges.writer.mint(floorNum, overrides).then(function (ret) {
        console.log(ret)
        this.popupMessage('已成功mint，请查看my floor.')
      })
      this.showInfo.mint = true
    },
    // closedd
    close () {
      const _that = this
      _that.showInfo.profile = false
      _that.showInfo.game = false
      _that.showInfo.avatar = false
    },
    click () {
      const message = {
        source: 'web',
        type: 'updateTitle'
      }
      sendMessage(message)
    },
    async myFloor () {
      const _that = this
      console.log('[Main] myFloor click')

      this.resetPopWindow() // reset
      this.resetMintFloor() // reset
      this.setting.loading = 'Loading...' // loading open

      await this.login()

      if (this.showInfo.myFloor) {
        this.showInfo.myFloor = false
      } else {
        this.showInfo.myFloor = true
      }

      const address = window.ethereum.selectedAddress
      const contractWriter = this.$Dapp.Bridges.writer
      const playerInfo = this.playerInfo
      const nftNum = 0

      await contractWriter.balanceOf(address).then(function (ret) {
        const nftNum = parseInt(ret)
        console.log('[Main][myFloor] call balanceOf:', ret, nftNum)
        if (nftNum === 0) {
          _that.popupMessage('Your have nothing nft')
          return
        }

        for (let i = 0; i < nftNum; i++) {
          contractWriter.tokenOfOwnerByIndex(address, i).then(function (tokenId) {
            console.log('[Main][myFloor]call tokenOfOwnerByIndex:', tokenId)

            contractWriter.getTokenInfo(tokenId).then(function (ret) {
              console.log('[Main][myFloor]call getTokenInfo:', ret)
              playerInfo.mintFloorTokenId.push(parseInt(ret.tokenId))
              playerInfo.mintFloorNumId.push(parseInt(ret.floorNo))
            })
          })
        }
      })

      if (nftNum === 0) {
        this.setting.loading = 'Empty...'
      }
    },
    async myFollowing () {
      this.resetPopWindow() // reset
      console.log('[Main][myFollowing]click myFollowing')
      await this.login()

      const _that = this
      if (_that.showInfo.myFollowing) {
        _that.showInfo.myFollowing = false
      } else {
        _that.showInfo.myFollowing = true
      }
      this.setting.loading = 'Loading...' // loading open

      // call
      this.playerInfo.myFollowing = await ajaxGetMyFollower('listbymefollower', window.ethereum.selectedAddress)

      if (this.playerInfo.myFollowing === null || this.playerInfo.myFollowing.length === 0) {
        this.setting.loading = 'Empty...'
      }
    },
    async myFollowed () {
      this.resetPopWindow() // reset
      console.log('[Main][myFollowed]click myFollowed')
      await this.login()

      const _that = this
      if (_that.showInfo.myFollowed) {
        _that.showInfo.myFollowed = false
      } else {
        _that.showInfo.myFollowed = true
      }

      this.setting.loading = 'Loading...' // loading open

      // call
      this.playerInfo.myFollowed = await ajaxGetMyFollower('listbyfollowerme', window.ethereum.selectedAddress)

      if (this.playerInfo.myFollowed === null || this.playerInfo.myFollowed.length === 0) {
        this.setting.loading = 'Empty...'
      }
    },
    async hot () {
      this.resetPopWindow() // reset

      const _that = this
      if (_that.showInfo.hot) {
        _that.showInfo.hot = false
      } else {
        _that.showInfo.hot = true
      }

      this.setting.loading = 'Loading...'

      this.floorInfo.hotList = await ajaxGetHotToken()
      console.log('[Main] hot list:', this.floorInfo.hotList)

      if (this.floorInfo.hotList === null || this.floorInfo.hotList.length === 0) {
        this.setting.loading = 'Empty...'
      } else {
        this.setting.loading = ''
      }
    },
    room () {
      this.popupMessage('[Main][room]room coming soon')
    },
    async avatar () {
      // this.popupMessage('插入测试数据.....')
      // await ajaxAddFollowerPeople(window.ethereum.selectedAddress, parseInt(Math.random() * 10000))
      // await ajaxAddFollowerPeople(parseInt(Math.random() * 10000), window.ethereum.selectedAddress)
      // await ajaxAddFollowerToken(window.ethereum.selectedAddress, parseInt(Math.random() * 10000))
      // await ajaxAddTokenInfo(parseInt(Math.random() * 10000), parseInt(Math.random() * 10000))
      const _that = this
      let address = _that.playerInfo.address
      if (!address) {
        // _that.popupMessage('Login first')
        // return
        address = '0x141721F4D7Fd95541396E74266FF272502Ec8899'
      }
      _that.showInfo.avatar = true
      _that.gameConfig.avatarUrl = _that.gameConfig.avatarBaseUrl + '?wallet=' + address
      console.log('[Main][avatar] avatarUrl', _that.showInfo.avatar, _that.gameConfig.avatarUrl)
    },
    windowCompute () {
      const _that = this
      console.log('[Main][windowCompute] ', _that.gameConfig.windowHeight)
      return {
        'min-height': '500px',
        'box-sizing': 'content-box',
        'border-width': '0px',
        height: _that.gameConfig.windowHeight + 'px',
        width: _that.gameConfig.windowHeight * 1.7778 + 'px'
      }
    },
    async goto () {
      const _that = this
      console.log('[Main] floor id is ', this.gotoNum)
      _that.search(this.gotoNum)
      // return
      await this.appContractWriter.getTokenInfo(this.gotoNum).then(function (ret) {
        console.log('[Main][goto] call getTokenInfo:', ret)
        const tokenId = parseInt(ret.tokenId)
        console.log('[Main][goto] token id:', tokenId)
        if (tokenId === 0) {
          this.popupMessage('this floor not available(may be you want to mint?), please input the right number')
        } else {
          this.popupMessage('going to the floor[' + tokenId + '] ...')
          this.popupMessage('coming soon :)')
        }
      })
    },
    search (floorId) {
      const _that = this
      let start = 0
      if (floorId > 0 && floorId <= 10000) {
        if (floorId <= _that.building.page / 2) {
          // start = 0
        } else if (floorId >= 9995) {
          start = 10000 - _that.building.page
        } else {
          start = floorId - _that.building.page / 2
        }
        // start = Math.ceil(floorId / 10) * 10
      }
      _that.building.start = start
      localStorage.setItem('buildingStart', start)
      _that.updateBuilding(start)
    },
    increment () {
      const _that = this
      let start = _that.getStart()
      // start = Math.ceil( start / 500 )
      if (start + 500 >= 10000) {
        start = 10000 - 11
      } else {
        start += 500
      }
      _that.building.start = start
      localStorage.setItem('buildingStart', start)
      _that.updateBuilding(start)
    },
    decrement () {
      const _that = this
      let start = _that.getStart()
      if (start < 500) {
        start = 1
      } else {
        start -= 500
      }
      _that.building.start = start
      localStorage.setItem('buildingStart', start)

      _that.updateBuilding(start)
    },
    getStart () {
      let start = localStorage.getItem('buildingStart')
      if (!start || parseInt(start) < 1) {
        start = 1
      } else {
        start = parseInt(start)
      }
      return start
    },
    lift (start) {
      // 23 - 0
      return {
        'padding-top': (22.71 - (22.71 * start) / 10000) + 'vw'
      }
    },
    updateBuilding (start, first = false) {
      const _that = this
      _that.building.floors = []
      _that.building.height = Math.ceil(start / 500) + 1
      if (start <= 6) {
        first = true
      }
      for (let i = start; i < start + 12; i++) {
        let floorId = _that.strPadLeft(i + 1)
        if (i >= 10) {
          let rand = 0
          while (rand === 0) {
            rand = Math.floor(Math.random(10) * 10)
          }
          floorId = _that.strPadLeft(rand)
        }
        _that.building.floors.push({ id: i, floorId: floorId, message: '', myFloor: i, order: 10 - i, image: '../assets/images/walls/floor_' + floorId + '.png' })
      }
      if (first) {
        _that.building.floors.push({ id: 0, floorId: 'x', message: '', myFloor: 'The Hall', order: 99999, image: '../assets/images/walls/floor_x.png' })
      }
    },
    async openGame (param) {
      const _that = this
      console.log('[Main][openGame] openGame param ', param)
      let address = _that.playerInfo.address
      if (!address) {
        // _that.popupMessage('Login first')
        // return
        address = '0x141721F4D7Fd95541396E74266FF272502Ec8899'
      }

      // send nft to iframe game
      // this.playerInfo.allNfts = await ajaxGetAllNfts(window.ethereum.selectedAddress)
      // const message = {
      //   source: 'web',
      //   type: 'nftList',
      //   data: []
      // }

      // for (var i in this.playerInfo.allNfts) {
      //   const tmp = this.playerInfo.allNfts[i]
      //   // console.log(i, this.playerInfo.allNfts[i])
      //   message.data.push({ token_id: tmp.token_id, nft_name: tmp.nft_name, image: tmp.image })
      // }
      // sendMessage(message)

      _that.showInfo.game = true
      _that.gameConfig.gameUrl =
        _that.gameConfig.baseUrl +
        '?roomId=' + param[0] +
        '&wallet=' + address +
        '&owned=' + '0'
      console.log('[Main][openGame] openGame result ', _that.showInfo.game, _that.gameConfig.gameUrl)
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        const last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
    },
    strPadLeft (str, chr = '0', len = 5) {
      // console.log('[Main] strPadLeft str ', str)
      return chr.repeat(len - String(str).length) + String(str)
    },
    popupMessage (message, gravity = 'top', position = 'center') {
      Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: gravity, // `top` or `bottom`
        position: position, // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)'
        }
      }).showToast()
    },
    copy () {
      const _that = this
      const clipboard = new Clipboard('.copy')
      clipboard.on('success', e => {
        _that.popupMessage('copy successfully')
      })
      clipboard.on('error', e => {
        _that.popupMessage('copy failed')
      })
    }
  },
  created () {
    console.log('[Main][created] created start!')
    const _that = this

    console.log('[Main][created] that ', _that.$Dapp)
    const start = _that.getStart()
    if (start <= 6) {
      _that.building.first = true
    }
    _that.building.start = start

    console.log('[Main][created] building ', _that.building)
    _that.updateBuilding(start, _that.building.first)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.game {
  z-index: 200;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  background-color: rgb(4 4 4 / 90%);
}
.close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  background: url(../assets/images/close.png) -2px -2px no-repeat;
  background-size: 30px 30px;
}
</style>
