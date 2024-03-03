Clazz.declarePackage("J.shapebio");
Clazz.load(["J.shapebio.Rockets"], "J.shapebio.Cartoon", null, function(){
var c$ = Clazz.declareType(J.shapebio, "Cartoon", J.shapebio.Rockets);
Clazz.overrideMethod(c$, "initShape", 
function(){
this.setTurn();
this.madDnaRna = 1000;
});
});
;//5.0.1-v2 Tue Feb 20 10:58:47 CST 2024
