/**
 * Created by Vitalii Upir on 5/9/2016.
 */

'use strict';
(function ($) {

    /**
     * Default configuration of calculator
     * @type {{calcClass: string, textClass: string, buttonClass: string}}
     */
    var defaultConfiguration ={
        //css class for calc form
        calcClass:"calc",
        //css class for calc text panel
        textClass:"text",
        //css class for calc buttons
        buttonClass:"button",
        //error message text
        errorMessage:'You can\'t calc something without digits!',
        additionalButtons:[]
    };

    /**
     * function - constructor calculator plugin
     * @param container
     * @param config
     * @constructor
     */
    function Calc(container, config) {
        //override default configuration
        this.config = $.extend(true, {}, defaultConfiguration, config);
        this.container = container;
        this.init();
    }

    /**
     * Initialization calculator
     */
    Calc.prototype.init= function () {
        this.container.append(this.createView());
    };

    /**
     * Creation calculator form
     * @returns {*|HTMLElement}
     */
    Calc.prototype.createView = function () {
        var _this = this;
        var calcPanel = $('<div/>',{'class':_this.config.calcClass});
        var text = $('<div>',{'class':_this.config.textClass}).append($('<p/>'));
        var symbols =[7,8,9,4,5,6,1,2,3,"+",0,"="];
        if(_this.config.additionalButtons.length>0){
            $.each(_this.config.additionalButtons,function (i, item) {
               symbols.push(item);
            });
        }
        var button = function (i) {
            return $('<div/>', {'class': _this.config.buttonClass}).html(i);
        };
        calcPanel.append(text);
        $.each(symbols,function (i,item) {

           calcPanel.append( _this.buttonEventClickDigit(text,button(item)));
        });
        return calcPanel;
    };

    /**
     * Events handler for button,
     * Showing digits click and result at @param text
     * @param text
     * @param button
     * @returns {*}
     */
    Calc.prototype.buttonEventClickDigit = function (text,button) {
        var _this=this;
        var str = text.find('p');
        button.click(function () {
            if(button.html()==='+'&& (str.html().length<1 || str.css('text-align') === 'right')){
                alert(_this.config.errorMessage);
            }else {
                if (button.html() != '=') {
                    //debugger;
                    if (str.css('text-align') === 'left') {
                        str.append(button.html());
                    } else {
                        str.css({'text-align': ''}).html(button.html());
                    }
                } else {
                    str.html(_this.calculate(str.html())).css({'text-align': 'right'});
                }
            }
        });
        return button;
    };

    /**
     * Calculation
     * @param text
     * @returns {number}
     */
    Calc.prototype.calculate = function (text) {
        var str=0;
        var sum = text.split('+');
        $.each(sum,function (i, item) {
            str=str+parseFloat(item);
        });
        return str;
    };

    /**
     * Adding calculator plugin to jQuery
     * @param configuration
     * @returns {*}
     */
    $.fn.calc = function (configuration) {
        new Calc(this.first(), configuration);
        return this.first();
    };
})(jQuery);