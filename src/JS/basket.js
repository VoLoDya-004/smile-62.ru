jQuery(function($) {
  
    function addBasket(idProduct) {
     $.ajax({
        url: `http://localhost:3000/src/PHP/basket.php?idProduct=${idProduct}`,//для локального тестирования
        //url: `/src/PHP/pagination.php?page=${currentPage}`, //при переносе на хостинг использовать такой адрес
        method: 'GET',
        success: function(data) {
          console.log("yes")
        },
        error: function (jqXHR, exception) {
          if (jqXHR.status === 0) {
            alert('Not connect. Verify Network.')
          } else if (jqXHR.status == 404) {
            alert('Requested page not found (404).')
          } else if (jqXHR.status == 500) {
            alert('Internal Server Error (500).')
          } else if (exception === 'parsererror') {
            alert('Requested JSON parse failed.')
          } else if (exception === 'timeout') {
            alert('Time out error.');
          } else if (exception === 'abort') {
            alert('Ajax request aborted.')
          } else {
            alert('Uncaught Error. ' + jqXHR.responseText)
          }
            }
      })
    }
  })