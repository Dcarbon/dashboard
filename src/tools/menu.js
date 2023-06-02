class InfomationHook {
  GetMenu() {
    return [
      { id: 1, label: "How does it work", href: "/how-does-it-work" },
      { id: 2, label: "Our solution", href: "/solution" },
      { id: 3, label: "Dcarbon DAO", href: "/dcarbon-DAO" },
      { id: 4, label: "Blog", href: "/blog" },
      { id: 5, label: "Nodes", href: "/dashboard" },
    ];
  }
  GetCompanyInfo() {
    return {
      email: "(+84) 243 941 1619",
      address:
        "2nd floor, Building 40 Phan Boi Chau, Cua Nam Ward, Hoan Kiem District, Hanoi, Vietnam",
    };
  }
}
export default InfomationHook;
