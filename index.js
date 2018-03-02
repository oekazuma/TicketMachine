//ユーザー所持金
let user = {
	possessionMoney: {
		tenThousand: {
      key: "10000",
      amount: 10000,
			value: 1,
			html: "TenThousand"
		},
		fiveThousand: {
      key: "5000",
      amount: 5000,
			value: 1,
			html: "FiveThousand"
		},
		thousand: {
      key: "1000",
      amount: 1000,
			value: 1,
			html: "Thousand"
		},
		fiveHundred: {
      key: "500",
      amount: 500,
			value: 1,
			html: "FiveHundred"
		},
		hundred: {
      key: "100",
      amount: 100,
			value: 2,
			html: "Hundred"
		},
		fifty: {
      key: "50",
      amount: 50,
			value: 3,
			html: "Fifty"
		},
		ten: {
      key: "10",
      amount: 10,
			value: 15,
			html: "Ten"
		}
  },
  eMoney: {
    value: 1000
  }
}

//投入金額
let entryAmount = {
	tenThousand: {
    key: "10000",
    amount: 10000,
		value: 0,
		html: "entryAmountTenThousand"
	},
	fiveThousand: {
    key: "5000",
    amount: 5000,
		value: 0,
		html: "entryAmountFiveThousand"
	},
	thousand: {
    key: "1000",
    amount: 1000,
		value: 0,
		html: "entryAmountThousand"
	},
	fiveHundred: {
    key: "500",
    amount: 500,
		value: 0,
		html: "entryAmountFiveHundred"
	},
	hundred: {
    key: "100",
    amount: 100,
		value: 0,
		html: "entryAmountHundred"
	},
	fifty: {
    key: "50",
    amount: 50,
		value: 0,
		html: "entryAmountFifty"
	},
	ten: {
    key: "10",
    amount: 10,
		value: 0,
		html: "entryAmountTen"
	}
}

//お釣り金額
let changeAmount = {
	tenThousand: {
    key: "10000",
    amount: 10000,
		value: 0,
		html: "changeAmountTenThousand"
	},
	fiveThousand: {
    key: "5000",
    amount: 5000,
		value: 0,
		html: "changeAmountFiveThousand"
	},
	thousand: {
    key: "1000",
    amount: 1000,
		value: 0,
		html: "changeAmountThousand"
	},
	fiveHundred: {
    key: "500",
    amount: 500,
		value: 0,
		html: "changeAmountFiveHundred"
	},
	hundred: {
    key: "100",
    amount: 100,
		value: 0,
		html: "changeAmountHundred"
	},
	fifty: {
    key: "50",
    amount: 50,
		value: 0,
		html: "changeAmountFifty"
	},
	ten: {
    key: "10",
    amount: 10,
		value: 0,
		html: "changeAmountTen"
	}
}

//購入チケット枚数
let byTickets = {
  amount: 130,
  count: 0
}

//所持チケット枚数
let possessionTicket = {
  count: 0
}

//投入金額IC
let entryEMoney = {
  value: 0
}

//チケット購入枚数表示
function renderByTicket() {
  document.getElementById("byTickets").innerHTML = byTickets.count
  document.getElementById("totalByTickets").innerHTML = byTickets.amount * byTickets.count
}

//チケット購入枚数リセット
function renderByTicketReset() {
  byTickets.count = 0
  document.getElementById("byTickets").innerHTML = byTickets.count
  document.getElementById("totalByTickets").innerHTML = 0
}

//所持チケット表示
function renderPossesionTicket() {
  var total = 0  
  if(calcEntryAmount() > byTickets.amount){
    possessionTicket.count += byTickets.count
    document.getElementById("possessionTicket").innerHTML = possessionTicket.count
  }
}

//所持金額表示
function renderPossessionMoney() {
  var total = 0
	let possessionMoney = user.possessionMoney
	Object.keys(possessionMoney).map((key) => {
    document.getElementById(possessionMoney[key].html).innerHTML = possessionMoney[key].value
    total += possessionMoney[key].amount * possessionMoney[key].value
  })
  document.getElementById("possessionMoney").innerHTML = total
}

//所持電子マネー表示
function renderEMoney() {
  document.getElementById("eMoney").innerHTML = user.eMoney.value
  document.getElementById("entryEMoney").innerHTML = entryEMoney.value
}

//投入金額表示
function renderEntryAmount() {
  var total = 0
	Object.keys(entryAmount).map((key) => {
    document.getElementById(entryAmount[key].html).innerHTML = entryAmount[key].value
    total += entryAmount[key].amount * entryAmount[key].value
  })
  document.getElementById("entryAmount").innerHTML = total
}

//投入金額リセット
function renderEntryAmountReset() {
	Object.keys(entryAmount).map((key) => {
    entryAmount[key].value = 0
    document.getElementById(entryAmount[key].html).innerHTML = 0
  })
  document.getElementById("entryAmount").innerHTML = 0
}

//お釣り金額表示
function renderChangeAmount() {
  var total = 0
	Object.keys(changeAmount).map((key) => {
    document.getElementById(changeAmount[key].html).innerHTML = changeAmount[key].value
    total += changeAmount[key].amount * changeAmount[key].value
  })
  document.getElementById("changeAmount").innerHTML = total
}

//お釣り金額取得
function renderChangeAcquisition() {
  var total = 0
  let possessionMoney = user.possessionMoney
	Object.keys(possessionMoney).map((key) => {
    document.getElementById(possessionMoney[key].html).innerHTML = possessionMoney[key].value + changeAmount[key].value
    possessionMoney[key].value += changeAmount[key].value
    total += possessionMoney[key].amount * possessionMoney[key].value
  })
  document.getElementById("possessionMoney").innerHTML = total
  renderChangeAmountReset()
}

//お釣り金額リセット
function renderChangeAmountReset() {
	Object.keys(changeAmount).map((key) => {
    changeAmount[key].value = 0
    document.getElementById(changeAmount[key].html).innerHTML = 0
  })
  document.getElementById("changeAmount").innerHTML = 0
}

//金額投入ボタン
function pressEntryButton(event) {
  var target = event.target.parentNode.dataset.buttonName

  if (target) {
    if (user.possessionMoney[target].value > 0) {
      entryAmount[target].value++
      user.possessionMoney[target].value--
      renderEntryAmount()
      renderPossessionMoney()
    }
  }
}

//ICカード投入ボタン
function pressIcButton() {
    if (user.eMoney.value > 124) {
      user.eMoney.value -= 124
      entryEMoney.value += 124
      renderEMoney()
    }
}
//現金選択
function radioMoney() {
  document.getElementById("ic").style.display ="none";
  document.getElementById("money").style.display ="flex";
  byTickets.count = 0
  byTickets.amount = 130
  document.getElementById("byTickets").innerHTML = byTickets.count
  document.getElementById("totalByTickets").innerHTML = byTickets.amount * byTickets.count
  document.getElementById("price").innerHTML = "130円"
}

//ICカード選択
function radioIc() {
  document.getElementById("money").style.display ="none";
  document.getElementById("ic").style.display ="block";
  byTickets.count = 0
  byTickets.amount = 124
  document.getElementById("byTickets").innerHTML = byTickets.count
  document.getElementById("totalByTickets").innerHTML = byTickets.amount * byTickets.count
  document.getElementById("price").innerHTML = "124円"
}

//チケットプラスボタン
function pressPlusTicketButton() {
  byTickets.count++
  renderByTicket()
}

//チケットマイナスボタン
function pressMinusTicketButton() {
  if(byTickets.count>0){
    byTickets.count--
    renderByTicket()
  }
}

//購入ボタン
function pressBuyButton() {
  var element = document.getElementById("target")
  var radioNodeList = element.payment
  var val = radioNodeList.value
  if (val == "money") {
    var total = 0
    Object.keys(changeAmount).map((key) => {
      document.getElementById(changeAmount[key].html).innerHTML = changeAmount[key].value
      total += changeAmount[key].amount * changeAmount[key].value
    })
    if(byTickets.count != 0){
      if(total == 0){
        renderPossesionTicket()
        purchase()
        renderEntryAmountReset()
      } else {
        alert("先にお釣りを受け取ってから購入してください")
      }
    } else {
      alert("チケット枚数を選択して下さい")
    }
  } else {
    if(byTickets.count != 0){
      let {amount, count} = byTickets
      var price = amount * count
      if(entryEMoney.value < price) {
        alert("投入金額が足りません")
        return
      }
      entryEMoney.value -= amount * count
      user.eMoney.value += entryEMoney.value
      entryEMoney.value = 0
      renderEMoney()
      possessionTicket.count += byTickets.count
      document.getElementById("possessionTicket").innerHTML = possessionTicket.count

    } else {
      alert("チケット枚数を選択して下さい")
    }
  }
}

//リセットボタン
function pressResetButton() {
  location.reload();
}

//投入金額計算
function calcEntryAmount() {
  var result = 0
  Object.keys(entryAmount).map((key) => {
    result += entryAmount[key].amount * entryAmount[key].value
  })
  return result
}

//購入処理
function purchase() {
  let {amount, count} = byTickets
  let result = changeCalc(amount * count, calcEntryAmount())

  Object.keys(changeAmount).map((key) => {
    if(result) {
      Object.keys(result).map((resultKey) => {
        if (key == resultKey) {
          changeAmount[key].value = result[resultKey].value
        }
      })
    }
  })
  renderChangeAmount()
}

//お釣り計算
function changeCalc(price, entry) {
	if (entry < price) {
    alert("投入金額が足りません")
    return
  }
  renderByTicketReset()
	let change = entry - price
  let yen = {
    tenThousand: {
      key: "10000",
      amount: 10000,
    },
    fiveThousand: {
      key: "5000",
      amount: 5000,
    },
    thousand: {
      key: "1000",
      amount: 1000,
    },
    fiveHundred: {
      key: "500",
      amount: 500,
    },
    hundred: {
      key: "100",
      amount: 100,
    },
    fifty: {
      key: "50",
      amount: 50,
    },
    ten: {
      key: "10",
      amount: 10,
    }
  }
  var result = {
    tenThousand: {
      key: "10000",
      value: 0,
    },
    fiveThousand: {
      key: "5000",
      value: 0,
    },
    thousand: {
      key: "1000",
      value: 0,
    },
    fiveHundred: {
      key: "500",
      value: 0,
    },
    hundred: {
      key: "100",
      value: 0,
    },
    fifty: {
      key: "50",
      value: 0,
    },
    ten: {
      key: "10",
      value: 0,
    }
  }
  
  Object.keys(yen).map((key) => {
    let quotient = Math.floor(change / yen[key].amount)
		result[key].value = quotient
		change -= yen[key].amount * quotient
  })
  
  return result
  
}

function initialRender() {
  renderPossessionMoney()
  renderEMoney()
  renderEntryAmount()
  renderChangeAmount()
  renderPossesionTicket()
  document.getElementById("ic").style.display ="none";
}

function initialEventLister() {
  document.getElementById("ticketPlusButton").addEventListener("click", pressPlusTicketButton)
  document.getElementById("ticketMinusButton").addEventListener("click", pressMinusTicketButton)
  let entryButtons = document.getElementsByClassName("entryButton")
  for (var i = 0; i < entryButtons.length; i++) {
    entryButtons[i].addEventListener("click", pressEntryButton)
  }
  document.getElementById("buyButton").addEventListener("click", pressBuyButton)
  document.getElementById("reset").addEventListener("click", pressResetButton)
  document.getElementById("change").addEventListener("click", renderChangeAcquisition)
  document.getElementById("icButton").addEventListener("click", pressIcButton)
}

document.addEventListener("DOMContentLoaded", function() {
  initialRender()
  initialEventLister()
})
