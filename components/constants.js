const HOST = "https://onkhata.com";
const CONSTANTS = {
  API : {
    manageDashboard: HOST+"/manageDashboard",
    updateDashboard: HOST+"/updateDashboard",
    addDashboard: HOST+"/AddDashboard",
    getUserALLPosts: HOST+"/getUserAllPost",
    getPostById: HOST+"/getPostById",
    manageDashboardActions : HOST+"/manageDashboardActions"
  },

  columns : {
    users : [
        { field: 'name', title: 'Name', minWidth: 100 },
        { field: 'email', title: 'Email', minWidth: 100 },
        {
          field: 'role',
          title: 'Role',
          minWidth: 100,
          align: 'right',
        },
        {
          field: 'status',
          title: 'Status',
          minWidth: 100,
          align: 'right',
        },
        {
          field: 'description',
          title: 'description',
          minWidth: 150,
          align: 'right',
        },
      ],
      category : [
        {
          field: 'name',
          title: 'Name',
          minWidth: 120,
          align: 'right',
        },
        {
          field: 'path',
          title: 'path',
          minWidth: 100,
          align: 'right',
        },
        
      ],
      topic : [
        {
          field: 'name',
          title: 'Name',
          minWidth: 80,
          align: 'right',
        },
        {
          field: 'path',
          title: 'Path',
          minWidth: 100,
          align: 'right',
        },
        {
          field: 'status',
          title: 'Status',
        minWidth: 100,
        align: 'right',
        },
        {
          field: 'sub',
          title: 'Sub Category',
          minWidth: 200,
          align: 'right',
        },
      ],
      posts : [
          { field: 'title', title: 'Title', minWidth: 170 },
          { field: 'topic', title: 'Topic', minWidth: 100 },
          {
            field: 'category',
            title: 'Category',
          minWidth: 100,
          align: 'right',
          },
          {
            field: 'status',
            title: 'Status',
          minWidth: 100,
          align: 'right',
          },
          {
            field: 'slug',
            title: 'Url',
          minWidth: 180,
          align: 'right',
          },
        
      ]
  }

}

export default CONSTANTS;