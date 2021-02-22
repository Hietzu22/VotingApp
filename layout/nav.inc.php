<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="index.php">VotingApp</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="#">Browse Votes</a>
            </li>
            <?php if (isset($_SESSION['logged_in'])): ?>
            <li class="nav-item">
                <a class="nav-link" href="newPoll.php">Make new vote</a>
            </li>
            <?php else: ?>
                <li class="nav-item">
                <a class="nav-link" href="login.php">Make new vote</a>
            </li>
            <?php endif; ?>
            <?php if (isset($_SESSION['logged_in'])): ?>
            <li class="nav-item">
                <a class="nav-link" href="logout.php">Logout</a>
            </li>
            <?php else: ?>
                <li class="nav-item">
                <a class="nav-link" href="login.php">Login</a>
            </li>
            <?php endif; ?>
            <?php if (!isset($_SESSION['logged_in'])): ?>
            <li class="nav-item">
                <a class="nav-link" href="register.php">Register</a>
            </li>
            <?php endif; ?>
            </ul>
        </div>
    </nav>