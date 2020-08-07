function example1() {
  console.log('EX 1:: script start');

  setTimeout(function () {
    console.log('setTimeout');
  }, 0);

  Promise.resolve()
    .then(function () {
      console.log('promise1');
    })
    .then(function () {
      console.log('promise2');
    });

  console.log('script end');
}


function example2 () {
  console.log('EX 2:: script start');

  var outer = document.querySelector('.outer');
  var inner = document.querySelector('.inner');

  inner.addEventListener('click', onClick);
  outer.addEventListener('click', onClick);

  new MutationObserver(function (record) {
    console.log('MutationObserver:: mutate', record);
  }).observe(outer, {
    attributes: true,
  });

  function onClick(e) {
    const {currentTarget} = e;
    console.log('onClick:: Clicked!!!', currentTarget);

    setTimeout(function () {
      console.log('onClick:: setTimeout:: target', currentTarget);
    }, 0);

    Promise.resolve().then(function () {
      console.log('onClick:: Promise:: from Promise', currentTarget);
    });

    outer.setAttribute('data-random', Math.random());
  }

}


function example3 () {
  console.log('EX 3:: script start with code click');

  var outer = document.querySelector('.outer');
  var inner = document.querySelector('.inner');

  inner.addEventListener('click', onClick);
  outer.addEventListener('click', onClick);

  new MutationObserver(function (record) {
    console.log('MutationObserver:: mutate', record);
  }).observe(outer, {
    attributes: true,
  });

  function onClick(e) {
    const {currentTarget} = e;
    console.log('onClick:: Clicked!!!', currentTarget);

    setTimeout(function () {
      console.log('onClick:: setTimeout:: target', currentTarget);
    }, 0);

    Promise.resolve().then(function () {
      console.log('onClick:: Promise:: from Promise', currentTarget);
    });

    outer.setAttribute('data-random', Math.random());
  }

    inner.click();
}
