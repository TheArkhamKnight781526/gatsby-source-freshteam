const { Request } = require('./src/request');
const { pascalCase } = require('change-case');

exports.onPreInit = () => { console.log('Loaded gatsby-source-freshteam') };

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, { apiToken, url, type }) => {
  const { createNode } = actions;
  const createNodes = (data, type) => {
    let nodes = [];
    data.forEach(item => {
      let nodeContent = JSON.stringify(item);
      const nodeMeta = {
        id: createNodeId(`${pascalCase(type)}-${item.id}`),
        parent: null,
        children: [],
        internal: {
          type: pascalCase(type),
          content: nodeContent,
          contentDigest: createContentDigest(item)
        }
      };
      const node = Object.assign({}, item, nodeMeta);
      nodes.push(node);
    });
    return nodes;
  };
  
  let headers = {
    'accept': 'application/json',
    'Authorization': `Bearer ${apiToken}`
  }
  if(Array.isArray(type)) {
    type.forEach(async each => {
      let data = await Request({ 
        domainURL: url,
        headers: headers,
        type: each,
      })
      let nodes = await createNodes(await data, each);
      nodes.forEach(node => {
        createNode(node);
      })
    })
  } else {
    let data = await Request({ 
      domainURL: url,
      headers: headers,
      type: type,
    })
    let nodes = await createNodes(await data, type);
    nodes.forEach(node => {
      createNode(node);
    })
  }
}