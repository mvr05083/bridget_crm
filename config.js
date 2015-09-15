module.exports = {
	'port' : process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002,
	'ip' : process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
	// 'database' : 'mongodb://localhost:27017/sjfc_crm',
	// 'database' : 'mongodb://crm_janitor:Ghostadmin3@ds035683.mongolab.com:35683/bcrm',
	'database' : 'mongodb://crm_janitor:Ghostadmin3@ds053218.mongolab.com:53218/bcrm_dev',
	'secret' : '$2a$10$3nwUav4zH4N0OnSXq7sfpeit8WcgRS/pj31sQt2fR4l0loVzSz.0.'
}
