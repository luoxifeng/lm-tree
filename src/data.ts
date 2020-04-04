
export const data = {
    title: '总部',
    open: true,
    children: [
      {
        name: '1元',
        open: true,
        active: true,
        title: "二级机构",
        children: [
          {
            name: "1元-二级机构A",
            open: false,
            active: true,
            title: "3级机构",
            children: [
              {
                name: '1元-二级机构A-3级机构A',
              },
              {
                name: '1元-二级机构A-3级机构B',
              },
            ]
          },
          {
            name: "1元-二级机构B",
            open: false,
            title: "3级机构",
            children: [
              {
                name: '1元-二级机构B-3级机构A',
              },
              {
                name: '1元-二级机构B-3级机构B',
              },
            ]
          }
        ]
      },
      {
        name: '2元',
        open: false,
        title: "二级机构",
        children: [
          {
            name: "2元-二级机构A",
            open: true,
            title: "3级机构",
            children: [
              {
                name: '2元-二级机构A-3级机构A',
              },
              {
                name: '2元-二级机构A-级机构B',
              },
            ]
          },
          {
            name: "2元-二级机构B",
            open: true,
            title: "3级机构",
            children: [
              {
                name: '2元-二级机构B-3级机构A',
              },
              {
                name: '2元-二级机构B-级机构B',
              },
            ]
          }
        ]
      },
    ]
    
  }
  