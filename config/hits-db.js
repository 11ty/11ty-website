const faunadb = require("faunadb");
const client = new faunadb.Client({
	secret: process.env.FAUNA_SECRET_KEY,
});

class HitsDb {
	async createNewDocumentForSlug(slug) {
		const q = faunadb.query;
		const doesDocExist = await client.query(
			q.Exists(q.Match(q.Index("hits_by_slug"), slug))
		);

		if (!doesDocExist) {
			await client.query(
				q.Create(q.Collection("hit-counter"), {
					data: { slug: slug, hits: 0 },
				})
			);
		}
	}

	async fetchDocumentForSlug(slug) {
		const q = faunadb.query;
		return client.query(
			q.Get(q.Match(q.Index("hits_by_slug"), slug))
		);
	}

	async increment(document) {
		const q = faunadb.query;
		await client.query(
			q.Update(document.ref, {
				data: {
					hits: document.data.hits + 1,
				},
			})
		);
	}

	getHits(document) {
		return document.data.hits;
	}

	async fetch(slug) {
		await this.createNewDocumentForSlug(slug);
		const document = await this.fetchDocumentForSlug(slug);
		let hits = this.getHits(document);

		// kick this off but don’t wait
		this.increment(document);

		return hits + 1;
	}
}

module.exports = HitsDb;
