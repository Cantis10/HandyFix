(function () {
  const navRootId = "admin-nav-root";
  const navItems = [
    { label: "Dashboard", icon: "fas fa-tachometer-alt", page: "/admin/" },
    { label: "Requests", icon: "fas fa-list-ul", page: "/admin/service" },
    {
      label: "Contractors",
      icon: "fas fa-hard-hat",
      page: "/admin/contractor",
    },
    { label: "Customers", icon: "fas fa-users", page: "/admin/customers" },
    { label: "Assignments", icon: "fas fa-link", page: "/admin/assignment" },
    { label: "Messages", icon: "fas fa-comment-dots", page: "/admin/messages" },
    { label: "Reports", icon: "fas fa-chart-bar", page: "/admin/reports" },
    { label: "Settings", icon: "fas fa-cog", page: "/admin/settings" },
    { label: "Logout", icon: "fas fa-sign-out-alt", page: "/login" },
  ];

  const navTemplate = `
<nav class="sidebar" id="sidebar">
  <ul>
    ${navItems
      .map(
        (item) => `
    <li data-page="${item.page}">
      <i class="${item.icon}"></i> ${item.label}
    </li>`,
      )
      .join("")}
  </ul>
</nav>
`;

  function normalizeSegment(segment) {
    return segment.replace(/\.html$/i, "").toLowerCase();
  }

  function getSlugFromValue(value) {
    if (!value) {
      return "admin";
    }

    const sanitized = value.split(/[?#]/)[0].replace(/\/+$|^\/+/, "");
    if (!sanitized) {
      return "admin";
    }

    const segments = sanitized.split("/");
    for (let i = segments.length - 1; i >= 0; i--) {
      const segment = segments[i];
      if (segment) {
        return normalizeSegment(segment);
      }
    }

    return "admin";
  }

  function renderNav() {
    const root = document.getElementById(navRootId);
    if (!root) {
      return;
    }

    root.innerHTML = navTemplate;

    const sidebar = document.getElementById("sidebar");
    if (!sidebar) {
      return;
    }

    const menuBtn = document.getElementById("menuBtn");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }

    sidebar.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", function () {
        const page = this.getAttribute("data-page");
        if (page) {
          window.location.href = page;
        }
      });
    });

    highlightActiveItem(sidebar);
  }

  function highlightActiveItem(sidebar) {
    const current = getSlugFromValue(
      window.location.pathname || window.location.href,
    );
    let matched = false;

    sidebar.querySelectorAll("li").forEach((item) => {
      const target = getSlugFromValue(item.getAttribute("data-page"));
      if (!matched && target === current) {
        item.classList.add("active");
        matched = true;
      } else {
        item.classList.remove("active");
      }
    });

    if (!matched) {
      const firstItem = sidebar.querySelector("li");
      if (firstItem) {
        firstItem.classList.add("active");
      }
    }
  }

  renderNav();
})();
