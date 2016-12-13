console.log('GHB: activate');

(function() {

    // just place a div at top right
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.right = 0;
   // div.textContent = 'Injected!'; // TEST
    document.body.appendChild(div);

    console.log('Insert OK');

    //  GridHelper.prototype.addGripHelperMonitor();

})();