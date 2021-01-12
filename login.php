<?php include_once 'layout/top.inc.php'; ?>
<?php include_once 'layout/nav.inc.php'; ?>

<div class="container">

  <form>
    <fieldset>
      <legend>Login</legend>
      <div class="form-group">
        <label for="Username">Username</label>
          <input name="Username" type="text" class="form-control" placeholder="Username">
      </div>
      <div class="form-group">
        <label for="Password">Password</label>
        <input name="Password" type="password" class="form-control" placeholder="Password">
      </div>
      </fieldset>
      <button type="submit" class="btn btn-primary">Login</button>
      <a href="register.php" class="btn btn-primary">Register</a>
      </button>
    </fieldset>
  </form>
</div>

<?php include_once 'layout/bot.inc.php'; ?>