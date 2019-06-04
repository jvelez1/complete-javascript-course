// BUDGET CONTROLLER

var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var Income = function (id, description, value) {
    this.id = id
    this.description = description
    this.value = value
  }

  var calculateTotal = function (type) {
    var sum = 0
    data.allItems[type].forEach(function (current) {
      sum += current.value
    })
    data.totals[type] = sum
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }

  return {
    addItem: function (type, desc, val) {
      var newItem, ID
      var lastItemByType = data.allItems[type].length
      ID = 0
      if (lastItemByType > 0) {
        ID = data.allItems[type][lastItemByType - 1].id + 1
      }

      // Create new item by type 'inc' 'exp'
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val)
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val)
      }

      // push it out data structure
      data.allItems[type].push(newItem)

      // return the new element
      return newItem
    },

    calculateBudget: function () {
      // calculate total income and expenses
      calculateTotal('exp')
      calculateTotal('inc')

      // calculate the budget: income - expenses
      data.budget = data.totals.inc + data.totals.exp

      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
      } else {
        data.percentage = -1
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: function () {
      return data
    }
  }
})()

// UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inpuntType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage'
  }

  return {
    getInpunt: function () {
      return {
        type: document.querySelector(DOMstrings.inpuntType).value, // will be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    addListItem: function (obj, type) {
      var html, newHtml, element
      // Create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer
        html = `<div class="item clearfix" id="income-%id%">
                  <div class="item__description">%description%</div>
                    <div class="right clearfix">
                      <div class="item__value">%value%</div>
                        <div class="item__delete">
                          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer
        html = `<div class="item clearfix" id="expense-%id%">
                  <div class="item__description">%description%</div>
                    <div class="right clearfix">
                      <div class="item__value">%value%</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`
      }
      newHtml = html.replace('%id%', obj.id)
      newHtml = newHtml.replace('%description%', obj.description)
      newHtml = newHtml.replace('%value%', obj.value)

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
    },

    clearFields: function () {
      var fields, fieldsArr
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)

      fieldsArr = Array.prototype.slice.call(fields)

      fieldsArr.forEach(function (current, index, array) {
        current.value = ''
      })

      fieldsArr[0].focus()
    },

    displayBudget: function (obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc
      document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp
      var percentageSelector = document.querySelector(DOMstrings.percentageLabel)

      if (obj.percentage > 0) {
        percentageSelector.textContent = obj.percentage + '%'
      } else {
        percentageSelector.textContent = '----'
      }
    },

    getDOMstrings: function () {
      return DOMstrings
    }

  }
})()

// GLOBAL APP CONTROLLER
var Controller = (function (budgetCtrl, UICtrl) {
  var setupEventListener = function () {
    var DOM = UICtrl.getDOMstrings()
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        ctrlAddItem()
      }
    })
  }

  var updateBudget = function () {
    // 1. CALCULATE THE BUDGET
    budgetController.calculateBudget()

    // 2. RETURN THE BUDGET
    var budget = budgetController.getBudget()

    // 3. DISPLAY THE BUTGED ON UI
    UICtrl.displayBudget(budget)
  }

  var ctrlAddItem = function () {
    // 1. GET THE FIELD INPUT DATA
    var input, newItem

    input = UICtrl.getInpunt()

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. ADD THE ITEM TO THE BUDGET CONTROLLER
      newItem = budgetCtrl.addItem(input.type, input.description, input.value)
      // 3. ADD THE ITEM TO THE UI
      UICtrl.addListItem(newItem, input.type)
      // 5 clear fields
      UICtrl.clearFields()

      // CALCULATE AND UPDATE BUDGET
      updateBudget()
    }
  }

  return {
    init: function () {
      console.log('Application has started.')
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      })
      setupEventListener()
    }
  }
})(budgetController, UIController)

Controller.init()
