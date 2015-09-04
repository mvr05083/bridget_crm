module.exports = {
	'port' : process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002,
	'ip' : process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
	// 'database' : 'mongodb://localhost:27017/sjfc_crm',
	'database' : 'mongodb://crm_janitor:Ghostadmin3@ds035683.mongolab.com:35683/bcrm',
	'secret' : 'Vj1QdrWifYFKbrLM99woJ2JhHSm/ufBfjQPsjH+WH+k='
}
