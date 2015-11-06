var resText="unlimited tag";
var nextSlotId=1;
function generateNextSlotId(){
  return nextSlotId++;
};
function moreContent(){
  var slotDiv = '',
      slotId = generateNextSlotId();
  var h3=document.createElement('h2'),
      text3=document.createTextNode("SP_ミドル3rd_レクタングル_" + slotId);
  h3.appendChild(text3);
  document.body.appendChild(h3);
  slotDiv=document.createElement('div');
  slotDiv.id="spMiddle_"+slotId;
  document.body.appendChild(slotDiv);
/*
  googletag.cmd.push(function() {
    var slotName3='',slot3='';
    slotName3='spMiddle_'+slotId;
    slot3=googletag.defineSlot('/62532913/s_genkimama_300x250_middle3rd_11203', [300, 250], slotName3).addService(googletag.pubads());
    googletag.display(slotName3);
    googletag.pubads().refresh([slot3]);
  });
*/
};
