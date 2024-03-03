Clazz.declarePackage("JU");
(function(){
var c$ = Clazz.declareType(JU, "DebugJS", null);
c$._ = Clazz.defineMethod(c$, "_", 
function(msg){
{
if (Clazz._debugging) {
debugger;
}
}}, "~S");
})();
;//5.0.1-v2 Tue Feb 20 10:58:47 CST 2024
