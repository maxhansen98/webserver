Clazz.declarePackage("J.adapter.readers.quantum");
Clazz.load(["J.adapter.smarter.AtomSetCollectionReader"], "J.adapter.readers.quantum.GaussianWfnReader", null, function(){
var c$ = Clazz.declareType(J.adapter.readers.quantum, "GaussianWfnReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.overrideMethod(c$, "initializeReader", 
function(){
this.continuing = false;
});
});
;//5.0.1-v2 Tue Feb 20 10:58:47 CST 2024
