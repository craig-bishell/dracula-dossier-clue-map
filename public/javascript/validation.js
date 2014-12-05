$('#addReview').submit(function (e) {
  $('.alert.alert-danger').hide();
  if (!$('input#lat').val() || !$('input#lng').val() || !$('textarea#clue').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div role="alert" class="alert alert-danger">Mandatory field not entered, please try again</div>');
    }
    return false;
  }
});