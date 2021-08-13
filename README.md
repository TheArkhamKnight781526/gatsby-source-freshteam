<h1 align="center">gatsby-source-freshteam</h1>


## Installation

To install, run:
```
npm install gatsby-source-freshteam
```

## Getting Started

To use this plugin, you will need a compatible plan (Blossom, Garden or Estate - Sprout will not work). You will also need an API Key. This can be found very easily:
* Go to your freshteam domain (example-46292682.freshteam.com)
* In the top right, click on your user profile - this will open a menu
* On this menu, click 'API Key'
* Complete the reCAPTCHA Challenge, and your API Key will be displayed

## Using This Plugin

In the gatsby-config.js file of your website, in the module.exports, add the following:
```js
module.exports = {
    plugins: [
        ...
        {
            resolve: 'gatsby-source-freshteam',
            options: {
                apiToken: 'your_api_token',
                url: 'your_freshteam_url',
                type: 'data_type' 
            }
        }
    ]
}
```

The different types are as follows:
* employees
* branches
* departments
* sub_departments
* business_units
* teams
* levels
* timeoffs
* roles
* job_postings
* candidate_sources
* user_functions
* new_hires

More info about the different data types can be found in the API docs:

https://developers.freshteam.com/api/

Type can either be a string or an array of strings.

### **Rate Limits**

The amount of fields you can query at once is dependent on the number of subscribed employees in your organization. As per the docs (https://developers.freshteam.com/api/#ratelimit), the rate limits are as follows:

| Plan    | Rate Limit (p/m)                  |
|---------|-----------------------------------|
| Sprout  | 0 (Again, will **not** work)      |
| Blossom | Number of subscribed employees    |
| Garden  | Number of subscried employees     |
| Estate  | 2x Number of subscribed employees |

Feel free to request as many fields as you want in the plugin, but be aware that the Freshteam API may send back an 'Error 429: Too Many Requests' response, in which case the plugin will **not** load. Unfortunately, there is nothing I can do about that.

## Example Query
Provided everything has loaded correctly, data can be fetched from GraphQL using a simple query. Here is an example using the 'job_postings' type:
```gql
query MyQuery {
  allJobPostings {
    edges {
      node {
        title
        description
        remote
      }
    }
  }
}
```

And the response:
```json
{
    "data": {
      "allJobPostings": {
        "edges": [
          {
            "node": {
              "title": "Web Developer (Remote)",
              "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "remote": true
            }
          }
        ]
      }
    }
}
```
<br />

Please submit any issues through GitHub, I will attempt to fix them ASAP. Alternatively, if you want to contribute, I'd be really grateful for your contributions! Create a pull request on GitHub, and I'll take a look!
<br />

## Enjoy!