var resText="unlimited tag";
var nSI=1;
function gNSI(){
  return nSI++;
};
function mTDa(){
  var sD='',sI=gNSI(),aTDI="aTD_"+sI,tID="tid_"+sI,tWS="tws_"+sI,tHS="ths_"+sI;
  var aTDc=document.createElement('div'),
      tDT="<label>id入力：<input type=\"text\" name=\""+tID+"\"></label><br>"+
          "<label>広告幅入力：<input type=\"text\" name=\""+tWS+"\" maxlength=\"4\" value=\"300\"></label><br>"+
          "<label>広告高入力：<input type=\"text\" name=\""+tHS+"\" maxlength=\"4\" value=\"250\"></label><br>";
      tDTd=document.createTextNode(tDT);
  aTDc.appendChild(tDTd);
/*
  aTDc.id=aTDI;
*/
  document.body.appendChild(aTDc);
  
/*
  var h3=document.createElement('h2'),
      text3=document.createTextNode("コンテンツ_" + slotId);
  h3.appendChild(text3);
  document.body.appendChild(h3);
  slotDiv=document.createElement('div');
  slotDiv.id="spMiddle_"+slotId;
  document.body.appendChild(slotDiv);
  googletag.cmd.push(function() {
    var slotName3='',slot3='';
    slotName3='spMiddle_'+slotId;
    slot3=googletag.defineSlot('/62532913/s_genkimama_300x250_middle3rd_11203', [300, 250], slotName3).addService(googletag.pubads());
    googletag.display(slotName3);
    googletag.pubads().refresh([slot3]);
  });
*/
};
