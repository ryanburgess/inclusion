module.exports = function update() {
  const obj = require('../list.json');
  const fs = require('fs');
  const videos = [];
  const podcasts = [];
  const books = [];
  const articles = [];
  const websites = [];
  const newsletters = [];

  let content = '# Inclusion \n This is a repository of resources to help educate and help with building a more inclusive work environment.';

   // create lists of resources
  for (let resource of obj) {
   const title = resource.title;
   const url = resource.url;
   const cat = resource.cat;
   const reason = resource.reason;

   const categoryMap = {
     book: books,
     video: videos,
     podcast: podcasts,
     article: articles,
     website: websites,
     newsletter: newsletters
   };

   categoryMap[cat].push({'title': title, 'url': url, 'reason': reason});
  }

  // create content of the list of links
  const outputLinks = (obj, title) => {
    content += `\n\n## ${title}`;
    const duplicates = [];
    for (const out of obj) {
      // avoid duplicates
      if (duplicates.indexOf(out.url) === -1) {
        duplicates.push(out.url);

        // provide a reason why the resource is helpful
        let reasonDetails = '';
        // if there isn't a reason provided in list.json keep reasonDetails blank
        if (out.reason !== undefined && out.reason !== '') {
          reasonDetails = ` - ${out.reason}`
        }
        // create the content that will be output to the Readme
        content += (
         `\n * [${out.title}](${out.url})${reasonDetails}`
       );
      }
    }
  }

  outputLinks(books, 'Books');
  outputLinks(websites, 'Websites');
  outputLinks(videos, 'Videos');
  outputLinks(podcasts, 'Podcasts');
  outputLinks(articles, 'Articles');
  outputLinks(newsletters, 'Newsletters');

  // create contributing instructions
  content += ('\n\n## Contributing \n' +
  '1. Fork it\n' +
  '2. Run `npm install`\n' +
  '3. Add your resource to `list.json`\n' +
  '4. Run `node index` to update `README.md` with your changes\n' +
  '5. Create your feature branch (`git checkout -b my-new-feature`)\n' +
  '6. Commit your changes (`git commit -am "Add some feature"`)\n' +
  '7. Push to the branch (`git push origin my-new-feature`)\n' +
  '8. Create new Pull Request\n');

  // create README file
   fs.writeFile('./README.md', content, function (err) {
       if (err) throw err;
       console.log('Updated resource list');
   });
 
};
