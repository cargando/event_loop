const S = 'START';
const E = 'END';

function print(text, type = 'task') {
  const T = ' task ';
  const M = ' micro ';

  const cssT = 'background-color: orange; color: white';
  const cssM = 'background-color: red; color: white';
  const cssStart = 'color: lawngreen';

  const textUpper = String(text).toUpperCase();

  if ( textUpper === 'START' || textUpper === 'END' ) {

    console.log(`%cScript ${textUpper === 'START' ? 'START' : 'END'}`, cssStart);

  } else if (String(type).toUpperCase() === 'TASK') {
    console.log(`${ text } %c${ T }`, cssT);
  } else {
    console.log(`${ text } %c${ M }`, cssM);
  }

}

function example1() {
  print(S);

  setTimeout(function () {
    print("setTimeout");
  }, 0);

  Promise.resolve()
    .then(function () {
      print("promise1, then #1", true);
    })
    .then(function () {
      print("promise1, then #2", true);
    });

  print(E);
}

function example2() {
  print(S);

  setTimeout(function () {
    print("setTimeout");
  }, 0);

  Promise.resolve()
    .then(function () {
      print("promise1, then #1", true);
      Promise.resolve().then(() => {
        print("From promise inside promise1", true);
      });
    })
    .then(function () {
      print("promise1, then #2", true);
    });

  print(E);
}

function example3() {
  print(S);

  setTimeout(function () {
    print("setTimeout");
  }, 0);

  Promise.resolve()
    .then(function () {
      print("promise1", true);
      Promise.resolve().then(() => {
        print("From promise inside promise1", true);
      });
    });
  Promise.resolve().then(function () {
      print("promise2", true);
    });

  print(E);
}

function example4() {
  print(S);

  setTimeout(() => print("setTimeout #1"));
  setTimeout(() => print("setTimeout #2"), 100);

  Promise.resolve()
    .then(() => {
      print("From promise1, then #1", true);
      Promise.resolve().then(() => {
        print("From promise inside promise1", true);
      });
    })
    .then(() => {
      print("From promise1, then #2", true);
    });

  Promise.resolve().then(() => {
    print("From promise2", true);
  });

  Promise.resolve().then(() => {
    print("From promise3", true);
  });

  print(E);
}

function example5(printTarget = false) {
  print(S);

  var outer = document.querySelector(".outer");
  var inner = document.querySelector(".inner");

  inner.addEventListener("click", onClick);
  outer.addEventListener("click", onClick);

  new MutationObserver(function (record) {
    print("MutationObserver:: mutate", true);
    printTarget && console.log(record);
  }).observe(outer, {
    attributes: true,
  });

  function onClick(e) {
    const { currentTarget } = e;
    console.log("onClick:: Clicked!!!");
    printTarget && console.log(currentTarget);

    setTimeout(function () {
      print("onClick:: setTimeout:: target");
      printTarget && console.log(currentTarget);
    }, 0);

    Promise.resolve().then(function () {
      print("onClick:: Promise:: from Promise", true);
      printTarget && console.log(currentTarget);
    });

    outer.setAttribute("data-random", Math.random());
  }

  print(E);
}

function example6(printTarget = false) {
  print(S);

  var outer = document.querySelector(".outer");
  var inner = document.querySelector(".inner");

  inner.addEventListener("click", onClick);
  outer.addEventListener("click", onClick);

  new MutationObserver(function (record) {
    print("MutationObserver:: mutate", true);
    printTarget && console.log(record);
  }).observe(outer, {
    attributes: true,
  });

  function onClick(e) {
    const { currentTarget } = e;
    console.log("onClick:: Clicked!!!");
    printTarget && console.log(currentTarget);

    setTimeout(function () {
      print("onClick:: setTimeout:: target");
      printTarget && console.log(currentTarget);
    }, 0);

    Promise.resolve().then(function () {
      print("onClick:: Promise:: from Promise", true);
      printTarget && console.log(currentTarget);
    });

    outer.setAttribute("data-random", Math.random());
  }

  inner.click();

  print(E);
}

function example7() {
  print(S);

  const inner = document.querySelector('.inner');

  new MutationObserver(innerChange).observe(inner, {'childList': true});

  function innerChange() {
    print('mutation started', true);
    for (let i=0; i<5; i++) {
      console.log(`below process to be added to microtask queue  ${ i }`);
      Promise.resolve(i).then(() => {
        print(`promise #${ i }`, true);
      });
    }
    setTimeout(() => {
      print('setTimeout');
    });
    console.log('mutation ended');
  }

  inner.innerHTML = '<span>I got added to the DOM</span>';

  print(E);
}
