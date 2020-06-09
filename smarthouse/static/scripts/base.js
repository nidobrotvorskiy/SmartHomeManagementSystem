var myTable = document.getElementsByTagName("form")[2];
var myClone = myTable.cloneNode(true);


var TReducersIncome = false;
var ReducersIncome = false;
let arrRec = [];
let dict = {};

function topFunction() {
    window.scrollTo(0, 0);
}

function createTable() {
    currentDiv = document.getElementById("tableDiv");
    var stro = "<strong>";
    tableCopy = myClone.cloneNode(true);
    tableCopy.id = (document.getElementsByTagName("table").length + 1).toString() + 'form';

    tag = tableCopy.childNodes[1].rows[0].cells;
    tag[0].innerHTML = stro + String(document.getElementsByTagName("table").length + 1) + stro;


    currentDiv.appendChild(tableCopy);
    window.scrollTo(0, document.body.scrollHeight);
}

function deleteTable() {
    currentDiv = document.getElementById("tableDiv");
    var indexTable = document.getElementsByTagName("table").length;
    var lastTable = document.getElementsByTagName("table")[indexTable - 1];

    lastTable.parentNode.removeChild(lastTable);
}

function calcButton(obj) {
    // section with all data collected in table
    var currentTable = obj.parentNode.parentNode.parentNode.parentNode.parentNode;
    var id_currentForm = currentTable.parentNode.id;
    currentForm = currentTable.parentNode;
    id_currentForm = '#' + id_currentForm;

    tag1 = currentTable.rows[0].cells;

    let toInput = "";
    let toInputB = "";

    var compAselect = tag1[1].getElementsByTagName('select')[0];
    var compAdrop = tag1[1].getElementsByTagName('select')[1];
    var compAinput = tag1[1].getElementsByTagName('input')[0];
    //if (compAdrop.value === "")
    if (compAinput !== undefined)
        toInput = compAinput.value;

    var compBselect = tag1[3].getElementsByTagName('select')[0];
    var compBdrop = tag1[3].getElementsByTagName('select')[1];
    var compBinput = tag1[3].getElementsByTagName('input')[0];

    if (compBinput !== undefined)
        toInputB = compBinput.value;

    tag2 = currentTable.rows[1].cells;
    var batchNr = tag2[0].getElementsByTagName('input')[0];
    var weldA = tag2[1].getElementsByTagName('input')[0];
    var diameter = tag2[2].getElementsByTagName('input')[0];
    var weldB = tag2[3].getElementsByTagName('input')[0];

    tag3 = currentTable.rows[2].cells;
    var chargeNr = tag3[0].getElementsByTagName('input')[0];
    var variableA = tag3[1].getElementsByTagName('select')[0];
    var length = tag3[2].getElementsByTagName('input')[0];
    var variableB = tag3[3].getElementsByTagName('select')[0];

    tag4 = currentTable.rows[3].cells;
    var spoel = tag4[0].getElementsByTagName('input')[0];
    var bbeA = tag4[1].getElementsByTagName('select')[0];
    var bbeB = tag4[3].getElementsByTagName('select')[0];
    // end section

    if (bbeA.value === '' || bbeB.value === '') {
        alert('Please, setup BBE option.');
        currentTable.rows[4].cells[1].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value = '##x##';
    } else {
        //alert(1);
        //alert(currentTable.rows[4].cells[1]);
        currentTable.rows[4].cells[1].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value = bbeA.value + 'x' + bbeB.value;
    }

    $.ajax({
        type: 'GET',
        url: "/testAjax",
        data: {
            compAname: compAselect.value,
            compAprops: compAdrop.value,
            compAweld: weldA.value,
            compAvar: variableA.value,
            compBname: compBselect.value,
            compBprops: compBdrop.value,
            compBweld: weldB.value,
            compBvar: variableB.value,
            diameter: diameter.value,
            length: length.value,
            compAinput: toInput,
            compBinput: toInputB
        },
        success: function (response) {
            //alert(1);
            currentTable.rows[4].cells[1].getElementsByTagName('input')[1].value = response["instance"];
        }
    });
}

function downloadCSV() {
    const element = document.createElement('a');

    var separator = ';'; //--------------------------------------------------------------SWITH BETWEEN ';' AND ',' TO DEFINE THE OUTPUT-----------------------------
    var nameDoc = document.getElementById('document');
    var firstLine = 'Document' + separator + nameDoc.value + '\n';
    var secondLine = 'Revision' + separator + document.getElementById('revision').value + '\n';
    var thirdLine = 'Page number' + separator + document.getElementById('pagenr').value + '\n';
    var fourthLine = 'ISO' + separator + document.getElementById('iso').value + '\n';
    var fifthLine = 'Project number' + separator + document.getElementById('projectnr').value + '\n';
    var sixthLine = 'Date' + separator + document.getElementById('date').value + '\n';
    var seventhLine = 'Name' + separator + document.getElementById('name').value + '\n';

    var resultText = firstLine + secondLine + thirdLine + fourthLine + fifthLine + sixthLine + seventhLine + '\n';

    for (var i = 0; i < document.getElementsByTagName("table").length; i++) {
        //alert(document.getElementsByTagName("table")[i].rows[4].cells[0].getElementsByTagName('span')[0].innerHTML); НАДО ПЕРЕДЕЛАТЬ СПАН!!!!!
        resultText += 'Table ' + (i + 1).toString() + '\n';
        resultText += 'Batch number' + separator + document.getElementsByTagName("table")[i].rows[1].cells[0].getElementsByTagName('input')[0].value + '\n';
        resultText += 'Charge number' + separator + document.getElementsByTagName("table")[i].rows[2].cells[0].getElementsByTagName('input')[0].value + '\n';
        resultText += 'Spoel' + separator + document.getElementsByTagName("table")[i].rows[3].cells[0].getElementsByTagName('input')[0].value + '\n';
        //3
        resultText += 'Diameter' + separator + document.getElementsByTagName("table")[i].rows[1].cells[2].getElementsByTagName('input')[0].value + '\n';
        resultText += 'Length' + separator + document.getElementsByTagName("table")[i].rows[2].cells[2].getElementsByTagName('input')[0].value + '\n';
        resultText += 'Commentary' + separator + document.getElementsByTagName("table")[i].rows[3].cells[2].getElementsByTagName('input')[0].value + '\n';

        resultText += 'Component' + separator + document.getElementsByTagName("table")[i].rows[0].cells[1].getElementsByTagName('select')[0].value + '\n';
        resultText += 'Weld' + separator + document.getElementsByTagName("table")[i].rows[1].cells[1].getElementsByTagName('input')[0].value + '; mm' + '\n';
        resultText += 'Variable' + separator + document.getElementsByTagName("table")[i].rows[2].cells[1].getElementsByTagName('select')[0].value + '\n';
        resultText += 'BBE' + separator + document.getElementsByTagName("table")[i].rows[3].cells[1].getElementsByTagName('select')[0].value + '\n';

        resultText += 'Component' + separator + document.getElementsByTagName("table")[i].rows[0].cells[3].getElementsByTagName('select')[0].value + '\n';
        resultText += 'Weld' + separator + document.getElementsByTagName("table")[i].rows[1].cells[3].getElementsByTagName('input')[0].value + '; mm' + '\n';
        resultText += 'Variable' + separator + document.getElementsByTagName("table")[i].rows[2].cells[3].getElementsByTagName('select')[0].value + '\n';
        resultText += 'BBE' + separator + document.getElementsByTagName("table")[i].rows[3].cells[3].getElementsByTagName('select')[0].value + '\n';

        resultText += 'Results' + '\n';
        resultText += 'BBE' + separator + document.getElementsByTagName("table")[i].rows[4].cells[0].getElementsByTagName('input')[0].value + '\n';
        resultText += 'Calculated length' + separator + document.getElementsByTagName("table")[i].rows[4].cells[0].getElementsByTagName('div')[0].getElementsByTagName('input')[0].value + '\n';

        resultText += '\n';
    }

    if (nameDoc.value === "") {
        alert('The document field is empty, enter and try again');
    } else {
        var fullnameDoc = nameDoc.value + '.csv';

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + resultText);
        element.setAttribute('download', fullnameDoc);

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

function getCSVformat() {
    const element = document.createElement('a');

    var separator = ';'; //--------------------------------------------------------------SWITH BETWEEN ';' AND ',' TO DEFINE THE OUTPUT-----------------------------
    var nameDoc = document.getElementById('document');
    var firstLine = 'Document' + separator + nameDoc.value + separator + "" + separator + "Component" + separator + "ISO Number" + separator + "Batch Number" + separator + "Charge Number" + separator + "Spool" + separator + "Weld" + separator + "Wall Thickness" + separator + "BBE" + separator + "Diameter" + separator + "Calculated Length" + separator + "Components" + '\n';
    /*var secondLine = 'Revision' + separator + document.getElementById('revision').value + '\n';
    var thirdLine = 'Page number' + separator + document.getElementById('pagenr').value + '\n';
    var fourthLine = 'ISO' + separator + document.getElementById('iso').value + '\n';
    var fifthLine = 'Project number' + separator + document.getElementById('projectnr').value + '\n';
    var sixthLine = 'Date' + separator + document.getElementById('date').value + '\n';
    var seventhLine = 'Name' + separator + document.getElementById('name').value + '\n';*/
    //alert(2);
    for (var i = 0; i < document.getElementsByTagName("table").length; i++) {
        var compA = document.getElementsByTagName("table")[i].rows[0].cells[1].getElementsByTagName('select')[0].value;
        var compB = document.getElementsByTagName("table")[i].rows[0].cells[3].getElementsByTagName('select')[0].value;
        var isoN = document.getElementById('iso').value;
        var batchN = document.getElementsByTagName("table")[i].rows[1].cells[0].getElementsByTagName('input')[0].value;
        var chargeN = document.getElementsByTagName("table")[i].rows[2].cells[0].getElementsByTagName('input')[0].value;
        var spool = document.getElementsByTagName("table")[i].rows[3].cells[0].getElementsByTagName('input')[0].value;

        var weldA = document.getElementsByTagName("table")[i].rows[1].cells[1].getElementsByTagName('input')[0].value;
        var weldB = document.getElementsByTagName("table")[i].rows[1].cells[3].getElementsByTagName('input')[0].value;
        var wallTh = document.getElementsByTagName("table")[i].rows[4].cells[0].getElementsByTagName('input')[0].value;
        var BBEa = document.getElementsByTagName("table")[i].rows[3].cells[1].getElementsByTagName('select')[0].value;
        var BBEb = document.getElementsByTagName("table")[i].rows[3].cells[3].getElementsByTagName('select')[0].value;
        var diameter = document.getElementsByTagName("table")[i].rows[1].cells[2].getElementsByTagName('input')[0].value;
        var rezLength = document.getElementsByTagName("table")[i].rows[4].cells[1].getElementsByTagName('input')[1].value;
        var comments = document.getElementsByTagName("table")[i].rows[3].cells[2].getElementsByTagName('input')[0].value;
        //alert(1);
        switch (i) {
            case 0:
                firstLine += "Revision" + separator + document.getElementById('revision').value + separator + "" + separator + compA + separator + isoN + separator + batchN + separator + chargeN + separator + spool + separator + weldA + separator + wallTh + separator + BBEa + separator + diameter + separator + rezLength + separator + comments + '\n';
                firstLine += "ISO" + separator + isoN + separator + "" + separator + compB + separator + isoN + separator + batchN + separator + chargeN + separator + spool + separator + weldB + separator + wallTh + separator + BBEb + separator + diameter + separator + rezLength + separator + comments + '\n';
                break;
            case 1:
                firstLine += "Project Number" + separator + document.getElementById('projectnr').value + separator + "" + separator + compA + separator + isoN + separator + batchN + separator + chargeN + separator + spool + separator + weldA + separator + wallTh + separator + BBEa + separator + diameter + separator + rezLength + separator + comments + '\n';
                firstLine += "Date" + separator + document.getElementById('date').value + separator + "" + separator + compB + separator + isoN + separator + batchN + separator + chargeN + separator + spool + separator + weldB + separator + wallTh + separator + BBEb + separator + diameter + separator + rezLength + separator + comments + '\n';
                break;
            case 2:
                firstLine += "Name" + separator + document.getElementById('name').value + separator + "" + separator + compA + separator + isoN + separator + batchN + separator + chargeN + separator + spool + separator + weldA + separator + wallTh + separator + BBEa + separator + diameter + separator + rezLength + separator + comments + '\n';
                firstLine += "Page Number" + separator + document.getElementById('pagenr').value + separator + "" + separator + compB + separator + isoN + separator + batchN + separator + chargeN + separator + spool + separator + weldB + separator + wallTh + separator + BBEb + separator + diameter + separator + rezLength + separator + comments + '\n';
                break;
            default:
                firstLine += "" + separator + "" + separator + "" + separator + compA + separator + isoN + separator + batchN + separator + chargeN + separator + spool + separator + weldA + separator + wallTh + separator + BBEa + separator + diameter + separator + rezLength + separator + comments + '\n';
                firstLine += "" + separator + "" + separator + "" + separator + compB + separator + isoN + separator + batchN + separator + chargeN + separator + spool + separator + weldB + separator + wallTh + separator + BBEb + separator + diameter + separator + rezLength + separator + comments + '\n';
                break;
        }
    }
    //alert(3);
    if (document.getElementsByTagName("table").length < 3) {
        var tmp = 3 - document.getElementsByTagName("table").length;
        switch (tmp) {
            case 1:
                firstLine += "Name" + separator + document.getElementById('name').value + separator + "\n";
                firstLine += "Page Number" + separator + document.getElementById('pagenr').value + separator + "\n";
                break;
            case 2:
                firstLine += "Project Number" + separator + document.getElementById('projectnr').value + separator + "\n";
                firstLine += "Date" + separator + document.getElementById('date').value + separator + "\n";

                firstLine += "Name" + separator + document.getElementById('name').value + separator + "\n";
                firstLine += "Page Number" + separator + document.getElementById('pagenr').value + separator + "\n";
                break;
            default:
                break;
        }
    }
    //alert(4);

    if (nameDoc.value === "") {
        alert('The document field is empty, enter and try again');
    } else {
        var fullnameDoc = nameDoc.value + '.csv';

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + firstLine);
        element.setAttribute('download', fullnameDoc);

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

function inputDia(obj) {
    var currentTable = obj.parentNode.parentNode.parentNode.parentNode.parentNode;
    var tag1 = currentTable.rows[0].cells;
    var compAselect = tag1[1].getElementsByTagName('select')[0];
    var compBselect = tag1[3].getElementsByTagName('select')[0];
    var tag3 = currentTable.rows[2].cells;
    var someAvar = tag3[1].getElementsByTagName('select')[0];
    var someBvar = tag3[3].getElementsByTagName('select')[0];

    someBvar.disabled = true;
    someAvar.disabled = true;

    if (obj.parentNode.getElementsByTagName('input')[1].checked) {
        obj.parentNode.getElementsByTagName('input')[0].placeholder = 'noemwijdte';
    } else {
        obj.parentNode.getElementsByTagName('input')[0].placeholder = 'inches';
    }

    var length = someAvar.options.length;
    for (k = length - 1; k > 0; k--) {
        someAvar.options[k] = null;
    }

    var length = someBvar.options.length;
    for (k = length - 1; k > 0; k--) {
        someBvar.options[k] = null;
    }
    // Hello world!
    if (obj.value !== "") {
        if (isFinite(obj.value)) {
            $.ajax({
                type: 'GET',
                url: "/checkDia",
                data: {
                    diameter: obj.value,
                    flag: obj.parentNode.getElementsByTagName('input')[1].checked
                },
                success: function (response) {
                    TReducersIncome = false;
                    ReducersIncome = false;
                    if (!response["valid"]) {
                        obj.style.borderColor = "red";
                        compAselect.disabled = true;
                        compBselect.disabled = true;
                        tag1[1].getElementsByTagName('select')[1].disabled = true;
                        tag1[3].getElementsByTagName('select')[1].disabled = true;
                        //--------------------------------
                        var length = compAselect.options.length;
                        for (k = length - 1; k > 0; k--) {
                            compAselect.options[k] = null;
                        }

                        var lengthB = compBselect.options.length;
                        for (k = lengthB - 1; k > 0; k--) {
                            compBselect.options[k] = null;
                        }
                    } else {
                        //alert(JSON.stringify(response));
                        dict = {};
                        arrRec = [];
                        compAselect.disabled = false;
                        compBselect.disabled = false;
                        tag1[1].getElementsByTagName('select')[1].disabled = true;
                        tag1[3].getElementsByTagName('select')[1].disabled = true;
                        var length = compAselect.options.length;
                        for (k = length - 1; k > 0; k--) {
                            compAselect.options[k] = null;
                        }

                        tag1[1].getElementsByTagName('select')[1].options[tag1[1].getElementsByTagName('select')[1].selectedIndex].text = "Select component first";
                        tag1[3].getElementsByTagName('select')[1].options[tag1[3].getElementsByTagName('select')[1].selectedIndex].text = "Select component first";
                        var lengthB = compBselect.options.length;
                        for (k = lengthB - 1; k > 0; k--) {
                            compBselect.options[k] = null;
                        }
                        obj.style.borderColor = "blue";
                        let tmpArr = [];
                        //-------------------------------------------------------

                        Object.keys(response).forEach(function (key) {
                            arrRec.push(key);
                        });
                        arrRec.shift();
                        arrRec.pop();

                        let names = JSON.parse(response["names"]);
                        let namesarr = [];
                        Object.keys(names).forEach(function (key) { // Здесь key = "wallthickness"; value = 3
                            var value = names[key];
                            namesarr.push(value);
                            //alert(key + " " + value);
                            //alert(JSON.stringify(value));
                        });

                        TReducersIncome = JSON.parse(response["data11"]);
                        ReducersIncome = JSON.parse((response["data12"]));
                        //alert("2");
                        for (let el in arrRec) {
                            let somearr = [];
                            let receive = JSON.parse(response[arrRec[el]]);

                            Object.keys(receive).forEach(function (key) {
                                var value = receive[key];
                                //alert(JSON.stringify(value));
                                Object.keys(value).forEach(function (key) { // Здесь key = "wallthickness"; value = 3
                                    if (el < 4) {
                                        var val = value[key];
                                        if (val !== null && val !== "None")
                                            somearr.push(val);
                                    } else {
                                        if (el < 8) {
                                            var val = value[key];
                                            if (val !== null && val !== "None")
                                                somearr.push(key)
                                        } else {

                                        }
                                    }
                                });
                            });
                            if (somearr.length !== 0) {
                                //alert(names[el] + " " + el);
                                dict[namesarr[el]] = somearr;
                            }
                        }

                        var length = compAselect.options.length;
                        for (k = length - 1; k > 0; k--) {
                            compAselect.options[k] = null;
                        }

                        var lengthB = compBselect.options.length;
                        for (k = lengthB - 1; k > 0; k--) {
                            compBselect.options[k] = null;
                        }

                        Object.keys(dict).forEach(function (key) {
                            var myOption = document.createElement("option");
                            myOption.text = key;
                            compAselect.add(myOption);
                        });

                        Object.keys(dict).forEach(function (key) {
                            var myOption = document.createElement("option");
                            myOption.text = key;
                            compBselect.add(myOption);
                        });

                        if (TReducersIncome) {
                            myOption = document.createElement("option");
                            var myOption2 = document.createElement("option");
                            myOption.text = 'TReducer';
                            myOption2.text = 'TReducer';
                            compAselect.add(myOption);
                            compBselect.add(myOption2);
                        }

                        if (ReducersIncome) {
                            myOption = document.createElement("option");
                            var myOption2 = document.createElement("option");
                            myOption.text = 'Reducer';
                            myOption2.text = 'Reducer';
                            compAselect.add(myOption);
                            compBselect.add(myOption2);
                        }

                        var myOptions = document.createElement("option");
                        myOptions.text = "SPECIAL";
                        var myOptionss = document.createElement("option");
                        myOptionss.text = "SPECIAL";
                        compAselect.add(myOptionss);
                        compBselect.add(myOptions);
                        //----------
                    }
                }
            });
        } else {
            obj.style.borderColor = "red";
        }
    } else {
        obj.style.borderColor = "red";

        var compAselect2 = tag1[1].getElementsByTagName('select')[1];
        var compBselect2 = tag1[3].getElementsByTagName('select')[1];

        compAselect.disabled = true;
        compBselect.disabled = true;
        compAselect2.disabled = true;
        compBselect2.disabled = true;
        //--------------------------------
        var length = compAselect.options.length;
        for (k = length - 1; k > 0; k--) {
            compAselect.options[k] = null;
        }

        var lengthB = compBselect.options.length;
        for (k = lengthB - 1; k > 0; k--) {
            compBselect.options[k] = null;
        }

        var length = compAselect2.options.length;
        for (k = length - 1; k > 0; k--) {
            compAselect2.options[k] = null;
        }

        var lengthB = compBselect2.options.length;
        for (k = lengthB - 1; k > 0; k--) {
            compBselect2.options[k] = null;
        }
    }
}

function getDict(obj) {
    //alert(obj.parentNode.getElementsByTagName('select')[0]);

    let compInGrid = obj.parentNode.getElementsByTagName('select')[1];
    let thisCell = obj.parentNode;
    compInGrid.disabled = false;

    var length = compInGrid.options.length;
    for (k = length - 1; k > 0; k--) {
        compInGrid.options[k] = null;
    }

    // SPECIAL IDENTIFICATION

    if (obj.value === "SPECIAL") {
        var someInput = document.createElement("input");
        thisCell.appendChild(someInput);
        compInGrid.disabled = true;
    } else {
        let thisInput = thisCell.getElementsByTagName('input')[0];
        if (thisInput !== undefined)
            thisCell.removeChild(thisInput);
    }

    //-----------------------


    var currentTable = obj.parentNode.parentNode.parentNode.parentNode;
    var tag3 = currentTable.rows[2].cells;
    var variableA = tag3[1].getElementsByTagName('select')[0];
    var variableB = tag3[3].getElementsByTagName('select')[0];
    var tag1 = currentTable.rows[0].cells;
    var compAselect = tag1[1].getElementsByTagName('select')[0];
    var compBselect = tag1[3].getElementsByTagName('select')[0];

    var length = variableA.options.length;
    for (k = length - 1; k > 0; k--) {
        variableA.options[k] = null;
    }

    //var length = variableB.options.length;
    //for (k = length - 1; k > 0; k--) {
    //    variableB.options[k] = null;
    //}

    variableA.disabled = true;
    //variableB.disabled = true;

    if (obj.value === compAselect.options[compAselect.selectedIndex].text) {
        var compSelected = obj.options[obj.selectedIndex].text;
        if (compSelected === "TReducer" || compSelected === "Reducer") {
            variableA.disabled = false;
            compInGrid.disabled = true;
            var someOption = document.createElement("option");
            someOption.text = "Big";
            variableA.add(someOption);
            var someOption2 = document.createElement("option");
            someOption2.text = "Small";
            variableA.add(someOption2);
        }
    }

    /*if (obj.value === compBselect.options[compBselect.selectedIndex].text) {
        var compSelected = obj.options[obj.selectedIndex].text;
        if (compSelected === "TReducer" || compSelected === "Reducer") {
            variableB.disabled = false;
            compInGrid.disabled = true;
            var someOption = document.createElement("option");
            someOption.text = "Big";
            variableB.add(someOption);
            var someOption2 = document.createElement("option");
            someOption2.text = "Small";
            variableB.add(someOption2);
        }
    }*/

    //alert(str);
    Object.keys(dict).forEach(function (key) {

        if (key === compSelected) {
            var value = dict[key];
            for (el in value) {
                /*if (el !== "0") {
                    var myOption = document.createElement("option");
                    myOption.text = value[0][el];
                    //alert(value[el]);
                    compInGrid.add(myOption);
                }*/
                var myOption = document.createElement("option");
                myOption.text = value[el];
                //alert(value[el]);
                compInGrid.add(myOption);
            }
        }
    });
}

function getDictB(obj) {
    //alert(obj.parentNode.getElementsByTagName('select')[0]);

    let compInGrid = obj.parentNode.getElementsByTagName('select')[1];
    let thisCell = obj.parentNode;
    compInGrid.disabled = false;

    var length = compInGrid.options.length;
    for (k = length - 1; k > 0; k--) {
        compInGrid.options[k] = null;
    }

    // SPECIAL IDENTIFICATION

    if (obj.value === "SPECIAL") {
        var someInput = document.createElement("input");
        thisCell.appendChild(someInput);
        compInGrid.disabled = true;
    } else {
        let thisInput = thisCell.getElementsByTagName('input')[0];
        if (thisInput !== undefined)
            thisCell.removeChild(thisInput);
    }

    //-----------------------


    var currentTable = obj.parentNode.parentNode.parentNode.parentNode;
    var tag3 = currentTable.rows[2].cells;
    var variableA = tag3[1].getElementsByTagName('select')[0];
    var variableB = tag3[3].getElementsByTagName('select')[0];
    var tag1 = currentTable.rows[0].cells;
    var compAselect = tag1[1].getElementsByTagName('select')[0];
    var compBselect = tag1[3].getElementsByTagName('select')[0];


    var length = variableB.options.length;
    for (k = length - 1; k > 0; k--) {
        variableB.options[k] = null;
    }

    variableB.disabled = true;

    if (obj.value === compBselect.options[compBselect.selectedIndex].text) {
        var compSelected = obj.options[obj.selectedIndex].text;
        if (compSelected === "TReducer" || compSelected === "Reducer") {
            variableB.disabled = false;
            compInGrid.disabled = true;
            var someOption = document.createElement("option");
            someOption.text = "Big";
            variableB.add(someOption);
            var someOption2 = document.createElement("option");
            someOption2.text = "Small";
            variableB.add(someOption2);
        }
    }

    //alert(str);
    Object.keys(dict).forEach(function (key) {

        if (key === compSelected) {
            var value = dict[key];
            for (el in value) {
                /*if (el !== "0") {
                    var myOption = document.createElement("option");
                    myOption.text = value[0][el];
                    //alert(value[el]);
                    compInGrid.add(myOption);
                }*/
                var myOption = document.createElement("option");
                myOption.text = value[el];
                //alert(value[el]);
                compInGrid.add(myOption);
            }
        }
    });
}

function workWithVar(obj) {
    var currentTable = obj.parentNode.parentNode.parentNode.parentNode;
    var tag3 = currentTable.rows[2].cells;
    var variableA = tag3[1].getElementsByTagName('select')[0];
    var variableB = tag3[3].getElementsByTagName('select')[0];
    var tag1 = currentTable.rows[0].cells;
    var compAselect = tag1[1].getElementsByTagName('select')[0];
    var compBselect = tag1[3].getElementsByTagName('select')[0];
    var compAselectDrop = tag1[1].getElementsByTagName('select')[1];
    var compBselectDrop = tag1[3].getElementsByTagName('select')[1];
    tag2 = currentTable.rows[1].cells;
    var batchNr = tag2[0].getElementsByTagName('input')[0];
    var weldA = tag2[1].getElementsByTagName('input')[0];
    var diameter = tag2[2].getElementsByTagName('input')[0];
    //var first = false;
    //if (obj.value === variableA.options[variableA.selectedIndex].text)
    //first = true;

    if (compAselect.value === "TReducer" || compAselect.value === "Reducer") {
        var length = compAselectDrop.options.length;
        for (k = length - 1; k > 0; k--) {
            compAselectDrop.options[k] = null;
        }
    }


    var nameForAjax = "";
    //if (first)
    nameForAjax = compAselect.options[compAselect.selectedIndex].text;
    //else
    //nameForAjax = compBselect.options[compBselect.selectedIndex].text;

    $.ajax({
        type: 'GET',
        url: "/checkDiaTwo",
        data: {
            diameter: diameter.value,
            type: nameForAjax,
            parameter: obj.value
        },
        success: function (response) {
            if (response["valid"]) {
                var receive = JSON.parse(response["data"]);
                Object.keys(receive).forEach(function (key) { // Здесь key = "wallthickness"; value = 3
                    var value = receive[key];
                    Object.keys(value).forEach(function (key) { // Здесь key = "wallthickness"; value = 3
                        var tmp = value[key];
                        var myOption = document.createElement("option");
                        myOption.text = tmp;
                        if (tmp !== null) {
                            //if (first) {
                            compAselectDrop.disabled = false;
                            compAselectDrop.add(myOption);
                            //} else {
                            //compBselectDrop.disabled = false;
                            //compBselectDrop.add(myOption);
                            //}
                        }
                    });
                });
            }
        }
    });
}

function workWithVarB(obj) {
    var currentTable = obj.parentNode.parentNode.parentNode.parentNode;
    var tag3 = currentTable.rows[2].cells;
    var variableA = tag3[1].getElementsByTagName('select')[0];
    var variableB = tag3[3].getElementsByTagName('select')[0];
    var tag1 = currentTable.rows[0].cells;
    var compAselect = tag1[1].getElementsByTagName('select')[0];
    var compBselect = tag1[3].getElementsByTagName('select')[0];
    var compAselectDrop = tag1[1].getElementsByTagName('select')[1];
    var compBselectDrop = tag1[3].getElementsByTagName('select')[1];
    tag2 = currentTable.rows[1].cells;
    var batchNr = tag2[0].getElementsByTagName('input')[0];
    var weldA = tag2[1].getElementsByTagName('input')[0];
    var diameter = tag2[2].getElementsByTagName('input')[0];


    if (compBselect.value === "TReducer" || compBselect.value === "Reducer") {
        var length = compBselectDrop.options.length;
        for (k = length - 1; k > 0; k--) {
            compBselectDrop.options[k] = null;
        }
    }


    var nameForAjax = "";
    nameForAjax = compBselect.options[compBselect.selectedIndex].text;

    $.ajax({
        type: 'GET',
        url: "/checkDiaTwo",
        data: {
            diameter: diameter.value,
            type: nameForAjax,
            parameter: obj.value
        },
        success: function (response) {
            if (response["valid"]) {
                var receive = JSON.parse(response["data"]);
                Object.keys(receive).forEach(function (key) { // Здесь key = "wallthickness"; value = 3
                    var value = receive[key];
                    Object.keys(value).forEach(function (key) { // Здесь key = "wallthickness"; value = 3
                        var tmp = value[key];
                        var myOption = document.createElement("option");
                        myOption.text = tmp;
                        if (tmp !== null) {
                            compBselectDrop.disabled = false;
                            compBselectDrop.add(myOption);
                        }
                    });
                });
            }
        }
    });
}

function check_Weldolet_A(obj) {
    var compAselect = obj.parentNode.getElementsByTagName('select')[0];
    var currentTable = obj.parentNode.parentNode.parentNode.parentNode;
    var tag3 = currentTable.rows[2].cells;
    var someAvar = tag3[1].getElementsByTagName('select')[0];
    var someBvar = tag3[3].getElementsByTagName('select')[0];
    tag2 = currentTable.rows[1].cells;
    var batchNr = tag2[0].getElementsByTagName('input')[0];
    var weldA = tag2[1].getElementsByTagName('input')[0];
    var diameter = tag2[2].getElementsByTagName('input')[0];
    var tag1 = currentTable.rows[0].cells;
    var compAdrop = tag1[1].getElementsByTagName('select')[1];


    var first = false;
    if (obj.value === compAdrop.options[compAdrop.selectedIndex].text)
        first = true;

    /*if (first) {
        var length = someAvar.options.length;
        for (k = length - 1; k > 0; k--) {
            someAvar.options[k] = null;
        }
    } else {
        var length = someBvar.options.length;
        for (k = length - 1; k > 0; k--) {
            someBvar.options[k] = null;
        }
    }*/

    if (compAselect.options[compAselect.selectedIndex].text === "Weldolet") {
        $.ajax({
            type: 'GET',
            url: "/checkDiaTwo",
            data: {
                diameter: diameter.value,
                type: "Weldolet",
                parameter: obj.value
            },
            success: function (response) {
                if (response["valid"]) {
                    var receive = JSON.parse(response["data"]);
                    Object.keys(receive).forEach(function (key) { // Здесь key = "wallthickness"; value = 3
                        var value = receive[key];
                        Object.keys(value).forEach(function (key) { // Здесь key = "wallthickness"; value = 3
                            var tmp = value[key];
                            var myOption = document.createElement("option");
                            let somestr = key;
                            myOption.text = convertWeldolet(somestr); // ==== key !!!!!!!!!!!! funct(str)
                            if (tmp !== null) {
                                if (first) {
                                    someAvar.disabled = false;
                                    someAvar.add(myOption);
                                } else {
                                    someBvar.disabled = false;
                                    someBvar.add(myOption);
                                }
                            }
                        });
                    });
                }
            }
        });
    }
}

function convertWeldolet(somestr) {
    if (somestr === 'weldolet_diam1')
        somestr = '3/8 inches';
    if (somestr === 'weldolet_diam2')
        somestr = '1/2 inches';
    if (somestr === 'weldolet_diam3')
        somestr = '3/4 inches';
    if (somestr === 'weldolet_diam4')
        somestr = '1 inches';
    if (somestr === 'weldolet_diam5')
        somestr = '1-1/2 inches';
    if (somestr === 'weldolet_diam6')
        somestr = '2 inches';
    if (somestr === 'weldolet_diam7')
        somestr = '3 inches';
    if (somestr === 'weldolet_diam8')
        somestr = '4 inches';
    if (somestr === 'weldolet_diam9')
        somestr = '6 inches';
    if (somestr === 'weldolet_diam10')
        somestr = '8 inches';
    if (somestr === 'weldolet_diam11')
        somestr = '10 inches';
    if (somestr === 'weldolet_diam12')
        somestr = '12 inches';
    if (somestr === 'weldolet_diam13')
        somestr = '14 inches';
    if (somestr === 'weldolet_diam14')
        somestr = '16 inches';
    if (somestr === 'weldolet_diam15')
        somestr = '18 inches';
    if (somestr === 'weldolet_diam16')
        somestr = '20 inches';
    if (somestr === 'weldolet_diam17')
        somestr = '24 inches';
    return somestr;
}