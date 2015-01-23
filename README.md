# Ember-cli-sitemap

Add on allows pulling sitemap from your server to your public directory before build. This is useful if your site have a dynamic sitmap and your server have ownership of the data. This is particualy useful if your emebr client is manage by some other third party hosting. Such as S3 or services like divshot where you don't have control of the server routing.

## Usage

### Installation

```bash
npm install --save-dev ember-cli-sitemap
```

### Deploy

There are 2 options avalible:

* include build

```ember sitemap build http://yourserver.com/sitmap```

This will place the site map in your project's public directory then exeucte ```ember build```. You can use the normal ```--``` option arguments for ember-cli as usual.

* fetch sitmap only

```ember sitemap http://yourserver.com/sitmap```

This will simply stech your sitemap and place to your public directory

## Contributing

### Running Tests

* `npm test`

## License

MIT