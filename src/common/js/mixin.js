import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
	computed: {
		...mapGetters([
			'playList'
		])
	},
	mounted() {
		this.handlePlaylist(this.playList)
	},
	activated() {
		this.handlePlaylist(this.playList)
	},
	watch: {
		playList(newVal) {
			this.handlePlaylist(newVal)
		}
	},
	methods: {
		handlePlaylist(playList) {
			throw new Error('component must implement handlePlaylist method')
		}
	}
}

export const playerMixIn = {
	computed: {
	  iconMode() {
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      ...mapGetters([
        'sequenceList',
        'currentSong',
        'playList',
        'mode'
      ])
	},
	methods: {
		changeMode() {
	        const mode = (this.mode + 1) % 3
	        this.setPlayMode(mode)
	        let list = null
	        if(mode === playMode.random) {
	          list = shuffle(this.sequenceList)
	        }else {
	          list = this.sequenceList
	        }
	        this.resetCurrentIndex(list)
	        this.setPlayList(list)
	      },
      resetCurrentIndex(list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentInex(index)
      },
      ...mapMutations({
      	setPlayState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAYLIST'
      })
	}
}

export const searchMixIn = {
	computed: {
		...mapGetters([
	      'searchHistory'
	    ])
	},
	data() {
		return {
			query: '',
			refreshDelay: 100
		}
	},
	methods: {
      blurInput() {
        this.$refs.searchBox.blur()
      },
      saveSearch() {
        this.saveSearchHistory(this.query)
      },
      onQueryChange(query) {
        this.query = query
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory'
      ]),
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      }
	}
}