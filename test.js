// var hdoj = require("./hdoj");
// var poj = require("./poj")
// var sdut = require("./sdut")
// var codeforces = require("./codeforces")
// // hdoj.crawl("Luuukas").then(info=>{
// //     console.log(info);
// // })

// // poj.crawl("CYH15502916268").then(info=>{
// //     console.log(info);
// // })

// sdut.crawl("Lukas").then(info=>{
//     console.log(info);
// })

// // codeforces.crawl("E-lie").then(info=>{
// //     console.log(info);
// // })

function* gen() {
    let col = 7
    while(col<12){
        yield console.log(col)
        col += 2;
    }
    console.log("All Done!");
  }
  
  function himmel(gen) {
    const item = gen.next()
    if (item.done) {
      return item.value
    }
  
    const { value, done } = item
    if (value instanceof Promise) {
      value.then((e) => himmel(gen))
    } else {
      himmel(gen)
    }
  }

  const g = gen()
  
  himmel(g);