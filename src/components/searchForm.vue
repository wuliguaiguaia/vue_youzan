<template>
  <div>
    <div class="custom-search js-search-bar" :class="{focus:focus || searchValue}">
      <form @submit="submit">
        <input
          type="search"
          class="custom-search-input"
          v-model="searchValue"
          @focus="focusInput"
          @blur="blurInput"
          :placeholder="searchForm.placeholder"
        >
        <span class="icon-custom-search"></span>
      </form>
      <button
        class="custom-search-type-selection-btn custom-search-type-selection-btn-focus"
        @click="showNavBtn"
        v-show="focus || searchValue"
      >{{searchForm.button}}</button>
      <span class="cancel" v-show="focus || searchValue" @click="goSort">取消</span>
      <div class="search-type-dropdown-menu" v-show="showNavButton">
        <span class="search-type-dropdown-menu-indicator">
          <i></i>
        </span>
        <div class="drop-menu-content">
          <div class="search-type-goods" @click="chooseGoods">
            <i class="icon-goods"></i>
            <span>商品</span>
          </div>
          <div class="search-type-dropdown-menu-divider"></div>
          <div class="search-type-shop" @click="chooseShops">
            <i class="icon-shop"></i>
            <span>店铺</span>
          </div>
        </div>
      </div>
    </div>
    <div class="search-content">
      <!-- 历史搜索 待做-->
    </div>
  </div>
</template>
<script>
export default {
  props: ["showId"],
  data() {
    return {
      focus: false,
      searchValue: "",
      showNavButton: false,
      searchForm: {
        value: "测试商品",
        placeholder: "搜索更赞的商品",
        button: "商品"
      },
      id: 0
    };
  },

  mounted() {
    if (this.showId) {
      this.id = this.showId;
    } else if (this.$route.query.showId) {
      this.id = this.$route.query.showId;
    } else {
      this.id = 0;
    }
    this.searchValue = this.$route.query.keyword;
  },
  watch: {
    id(val) {
      if (val == 0) {
        this.chooseGoods();
      } else {
        this.chooseShops();
      }
    },
    searchValue(val) {
      if (val && val.trim()) {
        this.focus = true;
      }
    }
  },
  methods: {
    focusInput() {
      this.focus = true;
      this.$router.push({ name: "search" });
    },
    blurInput() {
      // this.focus = false;
    },
    showNavBtn() {
      this.showNavButton = true;
    },
    submit(e) {
      e.preventDefault();
      if (this.searchValue.trim()) {
        this.$router.push({
          name: "search",
          query: { showId: this.id, keyword: this.searchValue }
        });
      }
    },
    chooseGoods() {
      this.id = 0;
      this.showNavButton = false;
      this.searchForm = {
        value: "测试商品",
        placeholder: "搜索更赞的商品",
        button: "商品"
      };
      if (this.searchValue.trim()) {
        this.$router.push({
          name: "search",
          query: { showId: this.id, keyword: this.searchValue }
        });
      }
    },
    chooseShops() {
      this.id = 1;
      this.showNavButton = false;
      this.searchForm = {
        value: "测试店铺",
        placeholder: "搜索更赞的店铺",
        button: "店铺"
      };
      if (this.searchValue.trim()) {
        this.$router.push({
          name: "search",
          query: { showId: this.id, keyword: this.searchValue }
        });
      }
    },
    goSort() {
      this.searchValue = "";
      this.$router.push({ name: "sort" });
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-search {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  padding: 6px 15px;
  background-color: #fafafa;
  z-index: 1001;
  border-bottom: 2px solid #e5e5e5;
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min--moz-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
  .custom-search {
    border-bottom-width: 1px;
  }
}

.custom-search form {
  margin: 0;
  position: relative;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
}

.custom-search form:before {
  z-index: 1;
  border-radius: 8px;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: left top;
  transform-origin: left top;
  pointer-events: none;
  border: 1px solid #e5e5e5;
}

.custom-search form::-webkit-input-placeholder {
  color: #d7d7d7;
}

.custom-search form .custom-search-input {
  margin: 0;
  padding: 0 10px 0 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 0;
  height: 32px;
  width: 100%;
  box-sizing: border-box;
  border: 0 none;
  outline: none;
  font-size: 14px;
  box-shadow: 0 0 0 0;
}
// focus
.custom-search.focus form {
  float: left;
  width: 88%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .custom-search-input {
    padding-left: 66px;
  }
}

.custom-search.focus:after {
}

.custom-search .cancel {
  display: block;
  margin-left: 8px;
  float: left;
  line-height: 32px;
  font-size: 14px;
  color: #666;
}

.icon-custom-search {
  position: absolute;
  top: 0;
  left: 2px;
  border: 0 none;
  height: 32px;
  line-height: 32px;
  width: 37px;
  padding: 0;
  color: #fff;
  font-size: 14px;
  text-indent: -9999px;
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAA2xJREFUWAnNV79rU1EUTh4NsYNImyHYTk4lCSUtRFRIkQri1hR0chX/gE4uHTK4OLnr7qTQuImDiIFWDNgQkpLJKZUOaRCHpqQ2ft/lnsvNa9/L68uj+iCcH/ec73zv3HvfvYnF/pMnHoRHs9lcRty64zgrw+FwHvqcztuPx+Od09PTL7C3crncd+2/sPAlAgKPUPw5UBcCIrdBahOE3gaMN2HnEqnX6zcSicQbvO1tE3kBBV3bGQwGj/P5/I+gaWeI7O3t3QXQO5BICQjsHuwKZAWyhbfe5xi6NQdfDr41yBLkjJXThf0wk8l8Fp+fHCGiSXwEQEIn9VH05dHR0YtCofDLD6hWq12bnp5+BnIbiLvCWJAbAOt+EDKGiJ6Ob0iUTnROTk7WFxcXa34E3GONRqMwNTW1BT8XNcl0MU03x02TI0B6TRgSx8fHty5KgljMYS7UDm2+GLGp+z2KCHcHEmRh9tmJpaUlBeSX7DXGXGJgvM8YYrOGVzz9iojeoiqOayJMJ9xFiEEs8ds1xGdLR3+s1HcC89njwrQDJtGJRUyNsaBrnQvJjrCF6kELK+N2h8QGkcQiphVralk+paJjzoo4wd5OEvdEEpjvBcCuJT6RDgLVNqMD7FsyEJUEZlOw7FriE8mpkQMsJl9MGYxCujBNLTe22jVuZ5R2r9czH010Z+iFTSLq3GAA5tCTsRfAOH8qlbouMZian6K7pQOW5sOFwKw7YFIbmDnBsGuJT6SDOeSlRj0ILIkelQTmmmDZtcQnklPDA0o9YF/iKSr2pJJYxLRwTC3Lp1RHX+/atMB+hke5OyisTSxi6vy231VS7Rq0bFOKYcFu8CgXO6wkBrEk364hPluardVqtbbBXk7gDo/ysCfw7u7ufDKZ/IpCcifZyWazd+zCbt18R3jHxHx2dYACCtMZ5tgkNJ5TrVavuovbtukInVFfFe1CeMntw8PDB8Vi8bftF32ECJ0hLs9ZTGmJu8NamLwi9mGru6sU8yNzhgiTIvo78RRXxFcgM7I2vMicS0TegNc7rPzQf7C4LmZnZz8EIeNLxCK0DD3UX86gZAIREUJhpR+Zg4ODe6urq32zfcMWCZLHncIdw/Vhx3PK0un0E/ouhQgL+ZBJXioRmwx03mP/4Pep2+2+5tg/e8rl8shs/AUCtdXXCXeHEgAAAABJRU5ErkJggg==")
    50% no-repeat;
  background-size: 16px 16px;
  border-radius: 5px 0 0 5px;
}

.custom-search-type-selection-btn {
  position: absolute;
  top: 6px;
  left: 15px;
  border: 0 none;
  font-size: 14px;
  color: #666;
  height: 32px;
  padding-right: 12px;
  padding-left: 12px;
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAAXNSR0IArs4c6QAAAINJREFUGBljnDlz5gIGBoZ4ICYGLGQCqsoC4mtEqAapyWIEKZw3b57W79+/TwOZXCA+FvCNlZXVNCkp6RrIBgYQg5GRMRuLQrAQSA6kBsQBawAx0tLSFgCphSA2GlgIlQMLwzVAFaH7B+xuZAPAfkAWQPIPA8zdyPJY2bNmzUoAYWySAB1bJ40myOHYAAAAAElFTkSuQmCC")
    no-repeat 100%;
  background-size: 6px, 4px;
  display: none;
}

.custom-search-type-selection-btn-focus {
  display: block;
}

.custom-search-button {
  position: absolute;
  top: 0;
  left: 2px;
  border: 0 none;
  height: 32px;
  line-height: 32px;
  width: 37px;
  padding: 0;
  color: #fff;
  font-size: 14px;
  text-indent: -9999px;
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAA2xJREFUWAnNV79rU1EUTh4NsYNImyHYTk4lCSUtRFRIkQri1hR0chX/gE4uHTK4OLnr7qTQuImDiIFWDNgQkpLJKZUOaRCHpqQ2ft/lnsvNa9/L68uj+iCcH/ec73zv3HvfvYnF/pMnHoRHs9lcRty64zgrw+FwHvqcztuPx+Od09PTL7C3crncd+2/sPAlAgKPUPw5UBcCIrdBahOE3gaMN2HnEqnX6zcSicQbvO1tE3kBBV3bGQwGj/P5/I+gaWeI7O3t3QXQO5BICQjsHuwKZAWyhbfe5xi6NQdfDr41yBLkjJXThf0wk8l8Fp+fHCGiSXwEQEIn9VH05dHR0YtCofDLD6hWq12bnp5+BnIbiLvCWJAbAOt+EDKGiJ6Ob0iUTnROTk7WFxcXa34E3GONRqMwNTW1BT8XNcl0MU03x02TI0B6TRgSx8fHty5KgljMYS7UDm2+GLGp+z2KCHcHEmRh9tmJpaUlBeSX7DXGXGJgvM8YYrOGVzz9iojeoiqOayJMJ9xFiEEs8ds1xGdLR3+s1HcC89njwrQDJtGJRUyNsaBrnQvJjrCF6kELK+N2h8QGkcQiphVralk+paJjzoo4wd5OEvdEEpjvBcCuJT6RDgLVNqMD7FsyEJUEZlOw7FriE8mpkQMsJl9MGYxCujBNLTe22jVuZ5R2r9czH010Z+iFTSLq3GAA5tCTsRfAOH8qlbouMZian6K7pQOW5sOFwKw7YFIbmDnBsGuJT6SDOeSlRj0ILIkelQTmmmDZtcQnklPDA0o9YF/iKSr2pJJYxLRwTC3Lp1RHX+/atMB+hke5OyisTSxi6vy231VS7Rq0bFOKYcFu8CgXO6wkBrEk364hPluardVqtbbBXk7gDo/ysCfw7u7ufDKZ/IpCcifZyWazd+zCbt18R3jHxHx2dYACCtMZ5tgkNJ5TrVavuovbtukInVFfFe1CeMntw8PDB8Vi8bftF32ECJ0hLs9ZTGmJu8NamLwi9mGru6sU8yNzhgiTIvo78RRXxFcgM7I2vMicS0TegNc7rPzQf7C4LmZnZz8EIeNLxCK0DD3UX86gZAIREUJhpR+Zg4ODe6urq32zfcMWCZLHncIdw/Vhx3PK0un0E/ouhQgL+ZBJXioRmwx03mP/4Pep2+2+5tg/e8rl8shs/AUCtdXXCXeHEgAAAABJRU5ErkJggg==")
    50% no-repeat;
  background-size: 16px 16px;
  border-radius: 5px 0 0 5px;
}

.custom-search-icon {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABqUlEQVR42r3WzyvDcRzH8Y+vOHDkpBwpB46k3MwOfu0wLvgDyEEp/8DOrjat5MSJs7i4O7CaWClqshxELphf81QO65Vv7+++37ZXPVprfT7Py7e+c5VKxY+HMWSQwzMYn3xHBjF4cLXy+2ESFwiyC0xGDbdiE2G2idagYY0eIMoOJB4onMV/u0IKcQxgBIs4wjd02VrCE9C9YxXNcD6GcQPdRJCwh3M5WEYcLoBO6IN4Ds8Kx6BbM2KqB69yR8wKp+XANVrgarQu92xY4RM5kIILoVfuObXCJTkwChfSQ9U9j1b4U8L9EcL56ous8BOqNxQhXARj3GuFcxJeDhntwFfVPWdWOCPh45DhJbknbYXjYJEesHYU5Y64FfZwKYdu0RUw2oQdOX8Jzwr/moaugD4j2oZd6KZqeTttQVdGBoNogvvTjRWUoNsL8z4+hN/eUMQzrJWRtMIa30aY7UNfq0krrBIoIMgKSMDhM2jc+pc5jizyeAHjk+/IYlye3gWf+IwRjsKOa7ge5qHxD8xIuLFxCTc0nqhHTM1B46W6RjWu4UaZxR3uMfUDvUqknv4oBC4AAAAASUVORK5CYII=")
    no-repeat 50%;
  background-size: 15px;
  height: 15px;
  width: 15px;
  display: inline-block;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: transparent;
}

// 下拉菜单
.search-type-dropdown-menu {
  width: 120px;
  position: absolute;
  top: 32px;
  left: 5px;
  border-radius: 2px;
  z-index: 1001;
}

.search-type-dropdown-menu-indicator {
  height: 12px;
  display: block;
}

.search-type-dropdown-menu-indicator i {
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 12px;
  border-color: transparent transparent #4e4e4e;
  margin-left: 17px;
}

.drop-menu-content {
  background: #4e4e4e;
  border-radius: 4px;
}

.search-type-goods {
  padding: 12px;
}

.search-type-goods span {
  font-size: 16px;
  color: silver;
  margin-left: 14px;
  display: inline-block;
  vertical-align: middle;
}

.search-type-shop {
  padding: 12px;
}

.search-type-shop span {
  font-size: 16px;
  color: silver;
  margin-left: 14px;
  display: inline-block;
  vertical-align: middle;
}

.search-type-dropdown-menu-divider {
  background: #666;
  height: 1px;
}

.icon-goods {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAmCAYAAACh1knUAAAAAXNSR0IArs4c6QAAA7RJREFUWAntmE1oU0EQx5ukSQ0ahWhTjU0b8GIPoviBJ8WiIKLoxQ/ai3r0E4SCVIWK4EEUFDx4EnqQCoKHtqC9WMWeKvYkaKGKTRrT2pqARCsxX/7m5W1I0iR9rUnooQvbeTs7M///m53dt2lNzRJppoXwCAQCrYlE4go+O+kNRXy/ox9JpVL3vV7vYBGbOWrDRHw+XxfeXQBoPiaTKTknGgrmzaJnPoW41dzcfFPG8zVDRPRMvAIkCsBVq9Xa43a7fxQKHgwG18VisTbm7tBXWCyW/Y2Nja8L2S5YRzb6xsfHU8jLRp2xvaT79Bvx0dJowFBqokYyYcBWM8H2qW67w4iPUSINUhPFlqMQkNjqdVSsqHPcjBLJcarEYMkQqTX4drIVF9MM++VsXzkjJiYmziHPgtqCXLkY9GI+1Mxv5j4Rt5vz5ZFeQ5p5hggENiaTyR6M9mYFimU9l+PRqoJAYogzpp0zJiA6bWkAN/n9fo0EBl/oHfS3Ho8nrBzLIXlZJ1h76PdE8rkQzH1gpU9pSJzXD5/PMzMzjnKAlooxPT29igNvTDAFW2y1XQMrqQn5PnTU19dH5LmSzeVy/RIswVDYavu2iNJsNg+JrEaDiMJKYwsorGR3xCicUDVICIZefzEdO7001QIvhaOWppRNVeaWieSneTkjRTPCvs58d/KNKjXOxtSWBkWI/VwbCoVWVwo0P65gCaZgy5yqkaAMotGoW2Q1WhaWhq2IfBXweDy+rRokdKytOpaGrZbmpSi5jxzTJysuFBZLMyBgKiN9KORad5gfU2srzULuJWAcEUx6n+BpRJqamoIUTi9jB8tzXSYq2bgQXSO+3Hv6+fh9EyyVkRqbzdYJuwS6C1xYtstkJRoZlzq8qGN1KowMEX4QjZKVB0zYMOrlFrVeGZVLTk1Nuci4ZL6O/pAL9EcVO+cQg4iFq9sA8gAGo1xuj5K6MWX8P5K4myhQ+R3cwosOUg4HkXEVM5MRUejpOol8z3AzjsMEaINYDmHlbESKLzFOId9hLyRGuAmeyCYhcQoCUNV2Cuox8/LvBSE4Qr9rt9tfGL3TyiV8dnb2EO4dkNilx3kGiTNk+Y+Ms1tBIsoAQu0Qus3Yq+v+QmiYZz9ykoxFdb0mAKkDdAMDD3I3UmpBmg/7G9TEk/Rw7t+SRMScgDZSe5rH4zy3IjM/kmS+RIsB/ob559RDN885pPP95iWS7RAOh9dEIpEt6OSbJG+u3liZCdgkPehwOD44nc6famI++Q/zQ4iwYYqv+AAAAABJRU5ErkJggg==")
    no-repeat 50%;
  background-size: contain;
}

.icon-goods,
.icon-shop {
  height: 19px;
  width: 18px;
  vertical-align: middle;
  display: inline-block;
}

.icon-shop {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAYAAADl9UilAAAAAXNSR0IArs4c6QAABJJJREFUWAntmE1oXFUUxztvMjZGrTUqk0yM0KikXVgltaglEMSV1FWl2IXtoi3YTVftRsGNIi4UN7oolBbaWnHhyo1UqFIIqPSDfoGGagv5mCEpJLFp0iRmMv7+N/c83pt5U/LCCCJ5cObce87/nPN/5968e9s1a/6jT+Z+vIaGhh5saWnJ3Q+zUt/MzMzfnZ2d9+rF1xAbGxt7eG5u7oNKpfIOQYV6gQ2yFzOZzFe5XO7Dtra26WjOGDHIrKVL/QBe8qA5tMQ9JHkEjGLueFNUrfOTGp/Foe8Sv+hxa9ESPRfoXi/+sNaS2f8ODg4eQipICYJ9JGkyQLFY3Oh9t8wW1d5XidpsjO+i/CMjI9vMptyqgb3kYw+ZTzqITmD8rjMGwX7e4BzzBfMvLi5u9uOrZluuDoLgirCQecFilFs18O2XzWqbPyQ2PDz8CoHP4Sh2dHR8bwDTEHNJSZSaGHkdMcthOaV9raJqi4P5QmIE7ZER5qcR2weGk9065oqEjmUMiHUvgw47ZmGqhZzW3Dho7IjB9gGcb8vAc2pJ1fxa0hV3jIzPUyv2B+eruJriIC6yOWK08E0MrTgus+7XPDhUExMT6/F34p+h9X+EjmUOyDlO7DA5HqLWs9Vhqqna4iAu8ttS7tYE50np6mdqasqW8TqYmmWuxteZuy1AvHU+BovUdlwCGD4O0+04ynzovo6h/SSSLPX+snzUsNhEYqotDuIiTgEbbhfBOnbO5PP5UUtUpa1jqfeX5bFPBvUsl7mc9rXPMMmJUwDLHfIQmLiM8oHpkeZtVkyMHNaxl5Ur6TEO4hRQbJNAGH9MAuMX5kX5CLheD+P9QCt2zMSghUJhkHidDPnx8fFHY04/MQ7k2KiOuc2McV0SuFQq9QB0fyRgn07CcNS45QGXYX+8loTB3ie/fNPT068mYYyDXkDEfhBofn7+UwLDs1G2ycnJxxYWFo5orIe1/1K3j6XZ0q/mskdsRyER2+B+ftQw1Pmcs/cJm0tjy4mDxuKkN3wK4yXkSQy/I9/i0xHRjd6N1vdtAK0P3wakxPwUcgvbBmQPtjbkT2z6VvWhtQr9jG8y7mLcy1hN+AmtldmCTDI/gQwwLmDfiXQzv430uNbCfku5XD6GI/amBOj5rqmp6SB+ETsC5nVnjfyQ6CzTA9lstkiH32d8GInuNV1nPgP3cXNz8/rZ2dkvyPMWttiD/wo59rEfLzpi8gLMslfeQH/DVHvqPeQXvsq/osPHX4e2YngGUZfOgzkXAhhoc1N8M0vcxb65CZmrra2tf0UxXHW2Eqtr0CeIzstdOtDR5SguHPu7UeK9KgQ1cFCvnvtra2CdhqVaJZa2lasdW+1Y2g6kxa/usf9vxzirxvR2o6Oj+bRvmRZvNaxmNL5mj3GI/ywAd6OPdLBHwY0cK7dqKKfVjOYPbxdm5Aq0iavLJebNiO5Tuucnn/gWlF5nIaNbbxcyy7Wqh6vOb9E0NcTkhFwv96/jBOv/Mv61h5e+wf1rL6T6q4skEhMIUgH3/W66p1tlQ5eU3GW6NNDe3j5Abvdvjmpi/wB5ZEDU0fjP7wAAAABJRU5ErkJggg==")
    no-repeat 50%;
  background-size: contain;
}
</style>

