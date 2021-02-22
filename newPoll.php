<?php session_start(); ?>
<?php
if (!isset($_SESSION['logged_in'])) {
  header('Location: index.php');
  die();
}
?>

<?php include_once 'layout/top.inc.php'; ?>
<?php include_once 'layout/nav.inc.php'; ?>

<div class="container">

  <div id="msg" class="alert alert-dismissible alert-warning d-none">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <h4 class="alert-heading">Warning!</h4>
    <p class="mb-0"></p>
  </div>

  <form name="register">
    <fieldset>
      <legend>Create new poll</legend>
      <div class="form-group">
        <label for="topic">Topic</label>
          <input name="topic" type="text" class="form-control" placeholder="Topic">
      </div>
      <div class="form-group">
        <label for="startTime">Start Time</label>
        <input name="startTime" type="datetime-local" class="form-control">
      </div>
      <div class="form-group">
        <label for="endTime">End Time</label>
        <input name="endTime" type="datetime-local" class="form-control">
      </div>

      <h3>Poll options</h3>
      <button id="addOption" class="btn btn-primary">Add option</button>
      <button id="deleteLastOption" class="btn btn-danger">Delete last option</button>
      <div class="form-group">
        <label for="option1">Option 1</label>
          <input name="option1" type="text" class="form-control" placeholder="Option 1">
      </div>
      <div class="form-group">
        <label for="option2">Option 2</label>
          <input name="option2" type="text" class="form-control" placeholder="Option 2">
      </div>

      </fieldset>
      <button type="submit" class="btn btn-primary">Save Poll</button>
  </form>

</div>

<script src="js/newPoll.js"></script>
<script src="js/common.js"></script>

<?php include_once 'layout/bot.inc.php'; ?>