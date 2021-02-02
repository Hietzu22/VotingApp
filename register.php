<?php include_once 'layout/top.inc.php'; ?>
<?php include_once 'layout/nav.inc.php'; ?>

<div class="container">

  <div id="msg" class="alert alert-dismissible alert-warning d-none">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <h4 class="alert-heading">Warning!</h4>
    <p class="mb-0"></p>
  </div>

  <form name="Register">
    <fieldset>
      <legend>Register</legend>
      <div class="form-group">
        <label for="Username">Username</label>
          <input name="Username" type="text" class="form-control" placeholder="Username">
      </div>
      <div class="form-group">
        <label for="Password">Password</label>
        <input name="Password" type="password" class="form-control" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="CPassword">Confirm Password</label>
        <input name="CPassword" type="password" class="form-control" placeholder="Confirm Password">
      </div>
      </fieldset>
      <button type="submit" class="btn btn-primary">Register</button>
      <a href="login.php" class="btn btn-primary">Login</a>
    </fieldset>
  </form>

</div>

<script src="js/register.js"></script>
<script src="js/common.js"></script>

<?php include_once 'layout/bot.inc.php'; ?>