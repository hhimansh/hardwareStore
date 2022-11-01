const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    UPSELL: Symbol("upsell items"),
    TOTAL: Symbol("total"),
    ITEM: Symbol("item")
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sItem = "";
        this.sPrice = 0;
        this.sTax = 0.13;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                aReturn.push("Welcome to Himanshu's Hardware Store.");
                aReturn.push(`For a list of what we sell tap the link below`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("Please type the item alphabet according to the item from menu you want to buy.");
                this.stateCur = OrderState.ITEM;
                break;
            case OrderState.ITEM:
                if(sInput.toLowerCase() == "b"){
                    this.sItem += " Broom ";
                    this.sPrice += 4;
                }
                else if(sInput.toLowerCase() == "s") {
                    this.sItem += " Snow Shovel ";
                    this.sPrice += 6;
                } 
                else if(sInput.toLowerCase() == "g"){
                    this.sItem += " Garbage/Recyle Bin ";
                    this.sPrice += 3;
                }
                else if(sInput.toLowerCase() == "l"){
                    this.sItem += " Light-bulb ";
                    this.sPrice += 2;
                }
                else if(sInput.toLowerCase() == "h"){
                    this.sItem += " Household Cleaner ";
                    this.sPrice += 5;
                }
                else if(sInput.toLowerCase() == "f"){
                    this.sItem += " Furnance Filter ";
                    this.sPrice += 8;
                }
                else if(sInput.toLowerCase() == "k"){
                    this.sItem += " Cat screen ";
                    this.sPrice += 10;
                }
                else {
                    this.stateCur = OrderState.ITEM;
                    aReturn.push("Please type alphabet again according to the menu only !!!");
                    aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                    break;
                }
                this.stateCur = OrderState.UPSELL;
                aReturn.push("Would you like a simoniz car cloth (c) or Descaler for a kettle (d) or 'no' ?");
                break;
            case OrderState.UPSELL:
                if(sInput.toLowerCase() == "c"){
                  this.sItem += " simoniz car cloth ";
                  this.sPrice += 6;
                }
                else if(sInput.toLowerCase() == "d"){
                  this.sItem += " descalar for kettle ";
                  this.sPrice += 8;
                }
                else if(sInput.toLowerCase() == "no"){
                    this.sItem += "";
                }
                else{
                    this.stateCur = OrderState.UPSELL;
                    aReturn.push("Please type either c, d or no according to your choice of item !!");
                    break;
                }
                aReturn.push("Would you like to order more items ? (yes or no)");
                this.stateCur = OrderState.TOTAL;
                break;
            case OrderState.TOTAL:
                if(sInput.toLowerCase() == "yes"){
                    this.stateCur = OrderState.ITEM;
                    aReturn.push("Please choose from the menu below.");
                    aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                    break;
                }
                else if(sInput.toLowerCase() == "no"){
                    this.sPrice += this.sTax * this.sPrice;
                    aReturn.push(`Thank-you for your order. Your order of ${this.sItem} has been successfully submitted`);
                    aReturn.push(`Your total comes to $${this.sPrice}`);
                    aReturn.push(`We will text you when we are ready to meet you at the curbside.`)
                    this.isDone(true);
                    break;
                }
                else{
                    aReturn.push("Please type either yes or no to proceed.... with your order");
                    this.stateCur = OrderState.TOTAL;
                    
                }
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html>

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type">
    <style type="text/css">
        ol {
            margin: 0;
            padding: 0
        }

        table td,
        table th {
            padding: 0
        }

        .c0 {
            border-right-style: solid;
            padding: 5pt 5pt 5pt 5pt;
            border-bottom-color: #000000;
            border-top-width: 1pt;
            border-right-width: 1pt;
            border-left-color: #000000;
            vertical-align: top;
            border-right-color: #000000;
            border-left-width: 1pt;
            border-top-style: solid;
            border-left-style: solid;
            border-bottom-width: 1pt;
            width: 156pt;
            border-top-color: #000000;
            border-bottom-style: solid
        }

        .c4 {
            color: #202122;
            font-weight: 700;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 14.5pt;
            font-family: "Arial";
            font-style: normal
        }

        .c5 {
            color: #202122;
            font-weight: 400;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 14.5pt;
            font-family: "Arial";
            font-style: normal
        }

        .c13 {
            color: #000000;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 11pt;
            font-family: "Arial";
            font-style: normal
        }

        .c12 {
            color: #000000;
            text-decoration: none;
            vertical-align: baseline;
            font-size: 19pt;
            font-family: "Arial";
            font-style: normal
        }

        .c1 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.15;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .c3 {
            padding-top: 0pt;
            padding-bottom: 0pt;
            line-height: 1.0;
            text-align: left
        }

        .c9 {
            border-spacing: 0;
            border-collapse: collapse;
            margin-right: auto
        }

        .c7 {
            background-color: #ffffff;
            max-width: 468pt;
            padding: 72pt 72pt 72pt 72pt
        }

        .c8 {
            color: #202122;
            font-size: 14.5pt
        }

        .c11 {
            margin-left: 108pt;
            text-indent: 36pt
        }

        .c10 {
            font-weight: 700
        }

        .c2 {
            height: 11pt
        }

        .c6 {
            height: 0pt
        }

        .title {
            padding-top: 0pt;
            color: #000000;
            font-size: 26pt;
            padding-bottom: 3pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        .subtitle {
            padding-top: 0pt;
            color: #666666;
            font-size: 15pt;
            padding-bottom: 16pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        li {
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        p {
            margin: 0;
            color: #000000;
            font-size: 11pt;
            font-family: "Arial"
        }

        h1 {
            padding-top: 20pt;
            color: #000000;
            font-size: 20pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h2 {
            padding-top: 18pt;
            color: #000000;
            font-size: 16pt;
            padding-bottom: 6pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h3 {
            padding-top: 16pt;
            color: #434343;
            font-size: 14pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h4 {
            padding-top: 14pt;
            color: #666666;
            font-size: 12pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h5 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            orphans: 2;
            widows: 2;
            text-align: left
        }

        h6 {
            padding-top: 12pt;
            color: #666666;
            font-size: 11pt;
            padding-bottom: 4pt;
            font-family: "Arial";
            line-height: 1.15;
            page-break-after: avoid;
            font-style: italic;
            orphans: 2;
            widows: 2;
            text-align: left
        }
    </style>
</head>

<body class="c7 doc-content">
    <p class="c1 c11"><span class="c10 c12">Items Available:</span></p>
    <p class="c1 c2"><span class="c10 c13"></span></p>
    <p class="c1 c2"><span class="c5"></span></p><a id="t.39cd945b8b19168f7ac6505973f3a4c1e43a6aa5"></a><a id="t.0"></a>
    <table class="c9">
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c4">ITEMS</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c4">ALPHABETS</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c4">PRICE</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Brooms </span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">b</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$4</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Snow shovels</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">s</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$6</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Garbage, Recycling containers and dustbins</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">g</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$3</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Light-bulbs</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">l</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$2</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Household cleaners</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">h</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$5</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Furnace filters</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">f</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$8</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Screen for when the cat climbs on your screen door</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">k</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$10</span></p>
            </td>
        </tr>
    </table>
    <p class="c1 c2"><span class="c5"></span></p>
    <p class="c1 c2"><span class="c5"></span></p>
    <p class="c1"><span
            class="c8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
            class="c4">Checkout/Upsell Items</span></p>
    <p class="c1 c2"><span class="c4"></span></p><a id="t.fb045592b72efe925a35e863a9f0ad2db3b9c397"></a><a id="t.1"></a>
    <table class="c9">
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c8 c10">UPSELL ITEMS</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c8 c10">ALPHABETS</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c4">PRICE</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Simoniz car cloths</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">c</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$6</span></p>
            </td>
        </tr>
        <tr class="c6">
            <td class="c0" colspan="1" rowspan="1">
                <p class="c1"><span class="c5">Descaler for a kettle</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">d</span></p>
            </td>
            <td class="c0" colspan="1" rowspan="1">
                <p class="c3"><span class="c5">$8</span></p>
            </td>
        </tr>
    </table>
    <p class="c1 c2"><span class="c5"></span></p>
    <p class="c1"><span class="c5">NOTE: please type the alphabet beside the item you want in the application</span></p>
    <p class="c1 c2"><span class="c4"></span></p>
</body>

</html>`);
  
    }
}
