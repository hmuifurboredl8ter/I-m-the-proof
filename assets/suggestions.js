(function () {
  var repo = "hmuifurboredl8ter/I-M-THE-PROOF";
  var api = "https://api.github.com/repos/" + repo +
    "/issues?labels=material-suggestion&state=open&per_page=30";
  var issuesUrl = "https://github.com/" + repo + "/issues?q=label%3Amaterial-suggestion";
  var status = document.getElementById("list-status");
  var list = document.getElementById("suggestion-list");

  function showError() {
    status.textContent = "Couldn't load suggestions right now. ";
    var a = document.createElement("a");
    a.href = issuesUrl;
    a.textContent = "Read them on GitHub.";
    status.appendChild(a);
  }

  fetch(api, { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) {
      if (!res.ok) throw new Error("bad status " + res.status);
      return res.json();
    })
    .then(function (issues) {
      // The issues endpoint also returns pull requests; skip those.
      var items = issues.filter(function (i) { return !i.pull_request; });
      if (!items.length) {
        status.textContent = "Nothing here yet. Send the first suggestion.";
        return;
      }
      status.textContent = items.length === 1 ? "1 open suggestion." : items.length + " open suggestions.";
      items.forEach(function (issue) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.href = issue.html_url;
        link.textContent = issue.title.replace(/^Material:\s*/i, "");
        var by = document.createElement("span");
        by.className = "by";
        by.textContent = "Suggested by " + issue.user.login;
        li.appendChild(link);
        li.appendChild(by);
        list.appendChild(li);
      });
    })
    .catch(showError);
})();
