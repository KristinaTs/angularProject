var host = "http://localhost:8080/";
var stompClient = null;

//\\\\\\\\\\\\\\\\\\\\\\\\\Lib start
let getRequest = function(location, handleResult) {
  $.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: host + location,
    timeout: 100000,
    success: function (data) {
      var result = JSON.stringify(data);
      console.log("SUCCESS: ", result);
      handleResult(data);
      //return result;
      //createList(data);
    },
    error: function (e) {
      console.log("ERROR: ", e);
    },
    done: function (e) {
      console.log("DONE");
    }
  });
};

let postRequest = function(location, postData, handleResult) {
  $.ajax({
    type: "post",
    contentType: "application/json; charset=utf-8",
    url: host + location,
    data: JSON.stringify(postData),
    dataType: 'json',
    timeout: 100000,
    success: function (data) {
      var result = JSON.stringify(data);
      console.log("SUCCESS: ", result);
      handleResult(data);
    },
    error: function (e) {
      console.log("ERROR: ", e);
    },
    done: function (e) {
      console.log("DONE");
    }
  });
};

let getUrlParameterByName = function (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};


let getCookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let setCookie = function (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}

///////////////////////////Lib end
////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\pos-list start
var createPosList = function(data) {
  let list = $('#pos-list');
  var table = $('<table border="1"></table>');
  for (let i = 0; i < data.length; i++){
    let row = $('<tr></tr>');
    let item = `<td>            
            <a href="pos.html?id=${data[i].id}"><div><img src="${data[i].logoUrl}" width="200" height="100"></div>${data[i].name}</a>
            </td>`;
    row.append(item);
    table.append(row);
  }
  list.append(table);
};

var getPosList = function () {
  getRequest("poses", function handleResult(result){
    createPosList(result);
  });
}
///////////////////////////pos-list end
////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\pos start
let createPosInfo = function(data) {
  let container = $('#pos');
  let element = `<h3>${data.name}</h3>
    			<p><img src="${data.logoUrl}" width="200" height="100"></p>
    			<p>${data.address}</p>
    			<table>
    			<tr><td>Food</td><td>Service</td><td>Atmosphere</td></tr>
    			<tr>
    			<td>${data.rating.foodQuality/10}</td>
    			<td>${data.rating.serviceQuality/10}</td>
    			<td>${data.rating.atmosphere/10}</td>
    			</tr>
    			</table>`;
  container.append(element);
};

var getPosInfo = function (){
  let id = getUrlParameterByName('id');
  getRequest("poses/" + id, function handleResult(result){
    createPosInfo(result);
  });
}

var requestTicket = function (){
  let id = getUrlParameterByName('id');
  var ticketRequest = {posId:id};
  postRequest("/ticket/request-ticket", ticketRequest, function handleResult(result){
    window.location.href = host + "pending-ticket.html?pos=" + id + "&id=" + result.id + "&ticketId=" + result.ticketId;
  });
}
///////////////////////////pos end
////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\pending ticket start
let ticketId = "";

let showPendingTicket = function (){
  let ticket = $('#ticket');
  let id = getUrlParameterByName('id');
  let element = `<p> PIN: ${id}</p>`;
  ticket.append(element);
}

let initWebSocket = function (){
  var socket = new SockJS('/ticket-websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/ticket.' + ticketId, function (result) {
      if(result.body == 'TICKET_CONFIRMED')
      {
        window.location.href = host + "ticket.html?id=" + ticketId;
      }
      else if (result.body == 'TICKET_UPDATED')
      {
        updateTicketInfo();
      }
    });
  });
}

var getPendingTicket = function (){
  let pos = getUrlParameterByName('pos');
  getRequest("poses/" + pos, function handleResult(result){
    createPosInfo(result);
  });

  showPendingTicket();

  ticketId = getUrlParameterByName('ticketId');
  initWebSocket();
}

var denyPendingTicket = function () {

}
//\\\\\\\\\\\\\\\\\\\\\\\\\pending ticket end
////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\ticket start

let ticket;

var wholeSingle = function(id, subTicketId){
  var subTicketUpdate = {subTicketId:subTicketId, totalParts:1, myParts:1, orderedItems:[id]};

  postRequest("/ticket/" + ticket.id + "/update", subTicketUpdate, function handleResult(result){
  });
}

var partSingle = function(id, subTicketId){
  var subTicketUpdate = {subTicketId:subTicketId, totalParts:4, myParts:1, orderedItems:[id]};

  postRequest("/ticket/" + ticket.id + "/update", subTicketUpdate, function handleResult(result){
  });
}

var wholeMulti = function(id, subticketIndex, subTicketId){
  var subTicketUpdate = {subTicketId:subTicketId, totalParts:1, myParts:1, orderedItems:[]};
  for (let j = 0; j < ticket.subTickets[subticketIndex].orderedItems.length; j++){
    if (ticket.subTickets[subticketIndex].orderedItems[j].menuItem.id == id){
      subTicketUpdate.orderedItems.push(ticket.subTickets[subticketIndex].orderedItems[j].id);
    }
  }

  postRequest("/ticket/" + ticket.id + "/update", subTicketUpdate, function handleResult(result){
  });
}

var partMulti = function(id, subticketIndex, subTicketId){
  var subTicketUpdate = {subTicketId:subTicketId, totalParts:4, myParts:1, orderedItems:[]};
  for (let j = 0; j < ticket.subTickets[subticketIndex].orderedItems.length; j++){
    if (ticket.subTickets[subticketIndex].orderedItems[j].menuItem.id == id){
      subTicketUpdate.orderedItems.push(ticket.subTickets[subticketIndex].orderedItems[j].id);
    }
  }

  postRequest("/ticket/" + ticket.id + "/update", subTicketUpdate, function handleResult(result){
  });
}

var wholeTotal = function(subticketIndex, subTicketId){
  var subTicketUpdate = {subTicketId:subTicketId, totalParts:1, myParts:1, orderedItems:[]};
  for (let j = 0; j < ticket.subTickets[subticketIndex].orderedItems.length; j++){
    subTicketUpdate.orderedItems.push(ticket.subTickets[subticketIndex].orderedItems[j].id);
  }

  postRequest("/ticket/" + ticket.id + "/update", subTicketUpdate, function handleResult(result){
  });
}

var partTotal = function(subticketIndex, subTicketId){
  var subTicketUpdate = {subTicketId:subTicketId, totalParts:4, myParts:1, orderedItems:[]};
  for (let j = 0; j < ticket.subTickets[subticketIndex].orderedItems.length; j++){
    subTicketUpdate.orderedItems.push(ticket.subTickets[subticketIndex].orderedItems[j].id);
  }

  postRequest("/ticket/" + ticket.id + "/update", subTicketUpdate, function handleResult(result){
  });
}

var removeTotal = function(subticketIndex, subTicketId){
  var subTicketUpdate = {subTicketId:subTicketId, totalParts:ticket.subTickets[subticketIndex].totalParts,
    myParts:0, orderedItems:[]};
  for (let j = 0; j < ticket.subTickets[subticketIndex].orderedItems.length; j++){
    subTicketUpdate.orderedItems.push(ticket.subTickets[subticketIndex].orderedItems[j].id);
  }

  postRequest("/ticket/" + ticket.id + "/update", subTicketUpdate, function handleResult(result){
  });
}

var removeSingle = function(subticketIndex, subTicketId, removedItemId){
  var subTicketUpdate = {subTicketId:subTicketId, totalParts:ticket.subTickets[subticketIndex].totalParts,
    myParts:1, orderedItems:[]};
  for (let j = 0; j < ticket.subTickets[subticketIndex].orderedItems.length; j++){
    if (ticket.subTickets[subticketIndex].orderedItems[j].id != removedItemId){
      subTicketUpdate.orderedItems.push(ticket.subTickets[subticketIndex].orderedItems[j].id);
    }
  }

  postRequest("/ticket/" + ticket.id + "/update", subTicketUpdate, function handleResult(result){
  });
}

let fillTransaction = function(id) {
  let transactionDiv = $('#transaction');
  transactionDiv.html('');
  transactionDiv.append(id);
};

let updateTransaction = function () {

  let transaction = getCookie("transaction");
  if (transaction != "") {
    fillTransaction(transaction);
  } else {
    getRequest("payment/transaction", function handleResult(result){
      setCookie("transaction", result.id, 1);
      fillTransaction(result.id);
    });
  }
}

let fillUnpaidItems = function(data, subticketIndex) {
  let result = $('<p></p>');

  result.append(`Unselected items below`);
  result.append(` <button title="${data.id}" onclick="wholeTotal(${subticketIndex}, this.title)">wholeTotal</button>`);
  result.append(` <button title="${data.id}" onclick="partTotal(${subticketIndex}, this.title)">partTotal</button>`);

  let table = $('<table border="1"  cellpadding="5"></table>');
  table.append(`<tr><td>Product</td><td>Price</td><td>Whole single</td>
            <td>Part single</td><td>Whole multi</td><td>Part multi</td></tr>`)
  for (let j = 0; j < data.orderedItems.length; j++){
    let row = $('<tr></tr>');
    let item = `<td>
            ${data.orderedItems[j].menuItem.title}</td><td>${data.orderedItems[j].menuItem.price/100}
            </td><td>
        	<button title="${data.orderedItems[j].id}" onclick="wholeSingle(this.title, ${data.id})">go</button>
            </td><td>
            <button title="${data.orderedItems[j].id}" onclick="partSingle(this.title, ${data.id})">go</button>
            </td><td>
            <button title="${data.orderedItems[j].menuItem.id}" onclick="wholeMulti(this.title, ${subticketIndex}, ${data.id})">go</button>
            </td><td>
            <button title="${data.orderedItems[j].menuItem.id}" onclick="partMulti(this.title, ${subticketIndex}, ${data.id})">go</button>
            </td>`;
    row.append(item);
    table.append(row);
  }
  result.append(table);

  return result;
}

let fillChosenItems = function(data, subticketIndex) {
  let result = $('<p></p>');

  let partsConfirmed = 0;
  let table2 = $('<table border="1"  cellpadding="5"></table>');
  table2.append(`<tr><td>Customer</td><td>Parts</td><td>Price</td><td>Paid</td><td>Remove</td></tr>`)
  for (let j = 0; j < data.shares.length; j++){
    partsConfirmed += data.shares[j].parts;
    let row = $('<tr></tr>');
    let item = `<td>
            ${data.shares[j].owner.firstName} ${data.shares[j].owner.lastName}
            </td><td>
        	${data.shares[j].parts}
            </td><td>
        	${data.shares[j].price/100}
            </td><td>
        	${data.shares[j].isPaid}
            </td><td>
            <button title="${data.id}" onclick="removeTotal(${subticketIndex}, this.title)">x</button>
            </td>`;
    row.append(item);
    table2.append(row);
  }

  if (partsConfirmed == data.totalParts){
    result.append(`Selected 100% Below`);
    if (partsConfirmed == 1){
      let table = $('<table border="1"  cellpadding="5"></table>');
      table.append(`<tr><td>Product</td><td>Price</td><td>Remove</td></tr>`)
      for (let j = 0; j < data.orderedItems.length; j++){
        let row = $('<tr></tr>');
        let item = `<td>
    	            ${data.orderedItems[j].menuItem.title}</td><td>${data.orderedItems[j].menuItem.price/100}
    	            </td><td>
    	        	<button title="${data.orderedItems[j].id}" onclick="removeSingle(${subticketIndex}, ${data.id}, this.title)">x</button>
    	            </td>`;
        row.append(item);
        table.append(row);
      }
      result.append(table);
    }
    else {
      let table = $('<table border="1"  cellpadding="5"></table>');
      table.append(`<tr><td>Product</td><td>Price</td></tr>`)
      for (let j = 0; j < data.orderedItems.length; j++){
        let row = $('<tr></tr>');
        let item = `<td>
    	            ${data.orderedItems[j].menuItem.title}</td><td>${data.orderedItems[j].menuItem.price/100}
    	            </td>`;
        row.append(item);
        table.append(row);
      }
      result.append(table);
    }
  }
  else if (partsConfirmed < data.totalParts){
    result.append(`Unselected parts below`);
    result.append(` <br><button title="${data.id}" onclick="partTotal(${subticketIndex}, this.title)">partTotal</button>`);

    let table = $('<table border="1"  cellpadding="5"></table>');
    table.append(`<tr><td>Product</td><td>Price</td></tr>`)
    for (let j = 0; j < data.orderedItems.length; j++){
      let row = $('<tr></tr>');
      let item = `<td>
	            ${data.orderedItems[j].menuItem.title}</td><td>${data.orderedItems[j].menuItem.price/100}
	            </td>`;
      row.append(item);
      table.append(row);
    }
    result.append(table);
  }
  else{
    //Invalid partsConfirmed > data.totalParts
  }

  result.append(table2);

  return result;
}

let createTicketInfo = function(data) {
  ticket = data;
  let list = $('#ticket');
  list.html('');
  list.append(`<p>Id: ${data.id}; Password: ${data.password};</p>`);

  if (1 < data.subTickets.length){
    data.subTickets.sort(function(a, b) {
      return a.id - b.id;
    });
  }

  for (let i = 0; i < data.subTickets.length; i++){
    if (data.subTickets[i].orderedItems.length > 0){
      let table = $('<table border="2"  cellpadding="1"></table>');
      table.append(`<br>SubTicket id: ${data.subTickets[i].id}; Total parts: ${data.subTickets[i].totalParts};`);

      if (1 < data.subTickets[i].orderedItems.length){
        data.subTickets[i].orderedItems.sort(function(a, b) {
          return a.menuItem.title.toLowerCase().localeCompare(b.menuItem.title.toLowerCase());
        });
      }

      if (0 == data.subTickets[i].shares.length){
        let unpaidItems = fillUnpaidItems(data.subTickets[i], i);
        table.append(unpaidItems);
      }
      else{
        let chosenItems = fillChosenItems(data.subTickets[i], i);
        table.append(chosenItems);
      }
      list.append(table);
    }
  }
};

let updateTicketInfo = function (){

  let id = getUrlParameterByName('id');
  getRequest("ticket/" + id, function handleResult(result){
    createTicketInfo(result);
  });

  ticketId = id;

}

var getTicketInfo = function (){
  updateTicketInfo();
  initWebSocket();
}
//\\\\\\\\\\\\\\\\\\\\\\\\\ticket end


