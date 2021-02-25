$(window).on('load', function() {
    $("#cover").hide();
 });
var calculator = new Vue({
    delimiters: ["[[", "]]"],
    el: '#calculator',
    data: {
        numberValues: [...Array(10).keys()].reverse(),
        calFunValues: ['AC', '+/-', '%'],
        operatorValues: ['+', '-', '*', '÷'],
        btnValues: Array(17).fill(null),
        otherValue: ['.', '='],
        btnCol: Array(17).fill("grid-column: span 1"),
        currentValue: '0',
        prevValue: null,
        currentOper:null,
    },
    created: function () {
        //依序插入按鈕值
        const nonOper = [...this.calFunValues, ...this.numberValues];
        this.btnValues = this.btnValues.map((ele, i) => {
            return (i + 1) % 4 == 0 ? this.operatorValues[(i + 1) / 4 - 1] : nonOper.splice(0, 1)[0]
        })
        this.btnValues = [...this.btnValues, ...this.otherValue]
        this.btnCol[this.btnValues.indexOf(0)] = "grid-column: span 2"
    },
    methods: {
        router: function (value) {
            if (value == "AC") {
                this.clearVal()
            }
            else if (value == "+/-") {
                this.sign()               
            }
            else if (value == "%") {
                this.persent()
            }
            else if (value == ".") {
                this.point()
            }
            else if (this.operatorValues.indexOf(value) != -1) {
                this.operatorNote(value)
            }
            else if (value == "=") {
                this.operatorCal()
            }
            else { 
                this.addValue(value)         
            }
        },
        addValue: function (value) { 
            this.currentValue= this.currentValue=='0'?`${value}`:`${this.currentValue}${value}`            
        },
        clearVal: function () { 
            this.currentValue='0'
        },
        operatorNote: function (value) { 
            this.prevValue = this.currentValue
            this.currentValue = ""
            console.log('currentOper=',value)
            this.currentOper=value
        },
        operatorCal: function () { 
            if (this.currentOper != null) {
              
                const math_it_up = {
                    '+': function (x, y) { return x + y },
                    '-': function (x, y) { return x - y },
                    '*': function (x, y) { return x * y },
                    '÷': function (x, y) { return x / y },
                }              
                this.currentValue = `${math_it_up[this.currentOper](parseFloat(this.prevValue), parseFloat(this.currentValue))}`
                this.prevValue = null
                this.currentOper = null
            }
        },
        persent: function () {           
            this.currentValue =`${parseFloat(this.currentValue)/100}`
        },
        point: function () {           
            if (this.currentValue.indexOf('.')==-1) { this.addValue('.') }
        },
        sign: function () { 
            this.currentValue =`${parseFloat(this.currentValue)*-1}`
        },    
    }  
})
