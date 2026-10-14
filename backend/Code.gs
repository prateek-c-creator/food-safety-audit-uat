/**
 * Food Safety Audit - backend (Google Apps Script).
 * Paste into Extensions > Apps Script of a Google Sheet. Run setup() once, then deploy as a Web app.
 */
var CHECKS = [{"id":"1a","text":"Food establishment has an updated FSSAI license, displayed at a prominent location.","max":2,"crit":false,"section":"General"},{"id":"1b","text":"Approved dairy product disclaimer found.","max":2,"crit":false,"section":"General"},{"id":"1c","text":"FSSAI checklist / certification file available at site.","max":2,"crit":false,"section":"General"},{"id":"2","text":"Premises design gives adequate working space and allows maintenance and cleaning to prevent entry of dirt, dust and pests.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"3","text":"Internal structure and fittings are made of non-toxic, impermeable material.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"4","text":"Walls, ceilings and doors are free from flaking paint or plaster, condensation and shedding particles.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"5","text":"Floors are non-absorbent, non-slippery and sloped appropriately.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"6","text":"Windows are kept closed and fitted with insect-proof screens when opening to the external environment.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"7","text":"Doors are smooth and non-absorbent. Suitable precautions are taken to prevent pest entry.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"8","text":"Potable water (IS:10500, tested semi-annually, records maintained) is used as an ingredient or in contact with food or food-contact surfaces.","max":4,"crit":true,"section":"I. Design & facilities"},{"id":"9","text":"Equipment and containers are non-toxic, impervious, non-corrosive and easy to clean and disinfect.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"10","text":"Adequate facilities for heating, cooling, refrigeration and freezing food, with temperature monitoring.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"11","text":"Sufficient lighting. Lighting fixtures are protected to prevent contamination on breakage.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"12","text":"Adequate ventilation is provided within the premises.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"13","text":"Adequate storage for food, packaging materials, chemicals and personal items.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"14","text":"Personnel hygiene facilities available: enough hand-washing facilities, toilets and change rooms for employees.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"15","text":"Food material is tested through an internal laboratory or an accredited lab. Check records.","max":2,"crit":false,"section":"I. Design & facilities"},{"id":"16","text":"Incoming material is procured to internal specification from approved vendors. Check records (certificate of analysis, Form E, supplier details, batch no., mfg and expiry dates, quantity).","max":2,"crit":false,"section":"II. Control of operation"},{"id":"17","text":"Raw materials are inspected on receipt for food safety hazards (vegetables, fruits and eggs checked for spoilage).","max":2,"crit":false,"section":"II. Control of operation"},{"id":"18","text":"Incoming, semi-finished and final products are stored at the required temperature in a hygienic environment. FIFO and FEFO practised.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"19","text":"All raw materials are cleaned thoroughly before food preparation.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"20","text":"Proper segregation of raw and cooked, vegetarian and non-vegetarian food.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"21","text":"All equipment is adequately sanitized before and after food preparation.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"22","text":"Frozen food is thawed hygienically. No thawed food is stored for later use.","max":4,"crit":true,"section":"II. Control of operation"},{"id":"23","text":"Vegetarian items cooked to min 60°C for 10 min or 65°C for 2 min core temperature. Non-vegetarian items 65°C for 10 min, 70°C for 2 min or 75°C for 15 sec core temperature.","max":4,"crit":true,"section":"II. Control of operation"},{"id":"24","text":"Cooked food intended for refrigeration is cooled appropriately.","max":4,"crit":true,"section":"II. Control of operation"},{"id":"25","text":"Food portioning done in hygienic conditions. High-risk food portioned in a refrigerated area or refrigerated within 30 minutes. Large amounts portioned below 15°C.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"26","text":"Hot food held at 65°C (non-veg at 70°C). Cold food at 5°C or below. Frozen products at -18°C or below.","max":4,"crit":true,"section":"II. Control of operation"},{"id":"27","text":"Reheating done appropriately. No indirect reheating (adding hot water, bain-marie or lamp).","max":4,"crit":true,"section":"II. Control of operation"},{"id":"28","text":"Oil used is suitable for cooking. Periodic verification of colour, flavour and floated elements is done.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"29","text":"Vehicles for food transport are clean, in good repair and hold the required temperature (hot 65°C, cold 5°C, frozen -18°C, within 2 hours of preparation).","max":4,"crit":true,"section":"II. Control of operation"},{"id":"30","text":"Food and non-food products transported together are separated adequately.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"31","text":"Cutlery and crockery used for dining service are clean and sanitized.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"32","text":"Packaging and wrapping material in contact with food is clean and food grade.","max":2,"crit":false,"section":"II. Control of operation"},{"id":"33","text":"Cleaning of equipment and premises done per cleaning schedule. No stagnant water in food zones.","max":2,"crit":false,"section":"III. Maintenance & sanitation"},{"id":"34","text":"Preventive maintenance of equipment and machinery done per manufacturer instructions. Check records.","max":2,"crit":false,"section":"III. Maintenance & sanitation"},{"id":"35","text":"Measuring and monitoring devices are calibrated periodically.","max":2,"crit":false,"section":"III. Maintenance & sanitation"},{"id":"36","text":"Pest control program available and carried out by trained personnel. Check records.","max":2,"crit":false,"section":"III. Maintenance & sanitation"},{"id":"37","text":"No signs of pest activity or infestation in premises (eggs, larvae, faeces).","max":4,"crit":true,"section":"III. Maintenance & sanitation"},{"id":"38","text":"Drains designed for expected flow loads and fitted with grease and cockroach traps.","max":2,"crit":false,"section":"III. Maintenance & sanitation"},{"id":"39","text":"Food waste and refuse removed periodically from food handling areas.","max":2,"crit":false,"section":"III. Maintenance & sanitation"},{"id":"40","text":"Annual medical examination and inoculation of food handlers (enteric group of diseases) done. Check records.","max":2,"crit":false,"section":"IV. Personal hygiene"},{"id":"41","text":"No person with a disease, illness, open wound or burn handles food or food-contact materials.","max":2,"crit":false,"section":"IV. Personal hygiene"},{"id":"42","text":"Food handlers maintain personal cleanliness (clean clothes, trimmed nails, waterproof bandage) and behaviour (hand washing, no loose jewellery, no smoking, no spitting).","max":4,"crit":true,"section":"IV. Personal hygiene"},{"id":"43","text":"Food handlers have suitable aprons, gloves and headgear wherever necessary.","max":2,"crit":false,"section":"IV. Personal hygiene"},{"id":"44","text":"Internal / external audit of the system is done periodically. Check records.","max":2,"crit":false,"section":"V. Training & records keeping"},{"id":"45","text":"Food business has an effective consumer complaints redressal mechanism.","max":2,"crit":false,"section":"V. Training & records keeping"},{"id":"46","text":"Food handlers have the knowledge and skills to handle food safely. Check training records.","max":2,"crit":false,"section":"V. Training & records keeping"},{"id":"47","text":"Appropriate documentation and records are available and retained for one year.","max":4,"crit":true,"section":"V. Training & records keeping"}];
var TOTAL = 118;
var DEPTS = {ops: 'Operations', kitchen: 'Kitchen'};
var SHIFTS = {morning: 'Morning', evening: 'Evening'};
var TZ = 'Asia/Kolkata';
var DEFAULTS = {recipient: '', adminEmail: '', keepDays: 7, accessCode: '', leaseTtl: 300, lockWait: 10, readTtl: 25, sectionLocks: true};
var TUNE_ = {leaseTtl: 300, lockWait: 10, readTtl: 25, sectionLocks: true};   /* set from admin settings on every request */
var AUDIT_HEAD = ['Key', 'Date', 'Area', 'Shift', 'Status', 'Employee', 'Designation', 'Employee ID', 'Submitted at (ms)', 'Score', 'Percent', 'Critical shortfalls', 'Updated at (ms)', 'Photos flushed at (ms)', 'JSON'];
var DETAIL_HEAD = ['Key', 'Date', 'Area', 'Shift', 'Employee', 'Designation', 'Employee ID', 'Completed at', 'Point', 'Section', 'Check', 'Critical', 'Max', 'Score', 'Remark', 'Photos'];
var KEY_RE = /^\d{4}-\d{2}-\d{2}_(ops|kitchen)_(morning|evening)$/;

/* ---------- entry points ---------- */
function setup() {
  sheet_('Audits', AUDIT_HEAD);
  sheet_('Detail', DETAIL_HEAD);
  folder_();
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'autoFlush') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('autoFlush').timeBased().everyDays(1).atHour(3).create();
  MailApp.getRemainingDailyQuota();
  Logger.log('Setup done. Now deploy as a Web app.');
}

function doGet() {
  return json_({ok: true, name: 'Food Safety Audit backend'});
}

function doPost(e) {
  var p;
  try { p = JSON.parse(e.postData.contents); } catch (err) { return json_({ok: false, error: 'bad_request'}); }
  try {
    var admin = {otpRequest: 1, otpVerify: 1, cfgGet: 1, cfgSet: 1, adminEmailSet: 1, adminStats: 1, flush: 1, testMail: 1, adminLocks: 1, releaseLocks: 1, clearCache: 1};
    if (p.a !== 'otpRequest' && p.a !== 'otpVerify' && admin[p.a]) requireToken_(p.token);
    var cfg = cfg_();
    TUNE_ = cfg;
    if (cfg.accessCode && p.code !== cfg.accessCode && !admin[p.a]) return json_({ok: false, error: 'bad_code'});
    var fn = ACTIONS[p.a];
    if (!fn) return json_({ok: false, error: 'unknown'});
    if (READS[p.a]) return json_(fn(p, cfg));            /* read side: cache snapshot, never takes the write lock */
    if (NOLOCK[p.a]) return json_(fn(p, cfg));           /* slow work that does not touch sheet rows */
    var out = withLock_(function () { return fn(p, cfg); });   /* write side: short critical section */
    if (out && out.__after) { var after = out.__after; delete out.__after; after(out); }   /* slow work (mail) runs after the lock is released */
    return json_(out);
  } catch (err) {
    if (err && err.code) return json_({ok: false, error: err.code, message: err.message || ''});
    return json_({ok: false, error: 'server', message: String(err)});
  }
}

var READS = {cfg: 1, connections: 1, list: 1, get: 1, photoGet: 1, cfgGet: 1, adminStats: 1, adminLocks: 1};
/* connections also touches Drive and Mail, but it only reads */
var NOLOCK = {photo: 1, photoDel: 1, testMail: 1, emailReport: 1};
var ACTIONS = {
  cfg: function (p, cfg) { return {ok: true, keepDays: cfg.keepDays}; },
  list: function (p) {
    var from = String(p.from || '0000-00-00');
    var entries = readCached_('list_' + from, function () {
      var out = [];
      rows_('Audits').forEach(function (r) { if (String(r[1]) >= from) { try { out.push(JSON.parse(r[14])); } catch (e) {} } });
      return out;
    });
    overlayLeases_(entries);
    return {ok: true, entries: entries};
  },
  get: function (p) {
    checkKey_(p.key);
    var e = readCached_('e_' + p.key, function () { var r = findRow_(p.key); return r ? JSON.parse(r.values[14]) : null; });
    if (e && e.status !== 'submitted') e.leases = leases_(p.key);
    return {ok: true, entry: e};
  },
  claim: function (p) {
    checkKey_(p.key);
    var uid = String(p.uid || '');
    if (!uid) throw err_('invalid', 'No device id');
    var want = (Number(p.mask) | 0) & allLegs_();
    if (!TUNE_.sectionLocks) return {ok: true, granted: want, busy: 0, leases: {}, off: true};   /* manual switch: locking disabled */
    var ls = leases_(p.key), busy = othersMask_(ls, uid) & want;
    if (busy) return {ok: true, granted: 0, busy: busy, leases: ls};          /* all or nothing */
    legs_().forEach(function (l, i) { if ((want >> i) & 1) putLease_(p.key, i, uid, p.name); });
    return {ok: true, granted: want, busy: 0, leases: leases_(p.key)};
  },
  release: function (p) {
    checkKey_(p.key);
    dropLeases_(p.key, allLegs_(), String(p.uid || '-'));
    return {ok: true};
  },
  save: function (p) {
    var e = p.entry;
    if (!e) throw err_('invalid', 'No entry');
    checkKey_(e.key);
    var uid = String(p.uid || '');
    var r = findRow_(e.key);
    if (r && r.values[4] === 'submitted') throw err_('locked', 'Already submitted');
    var kp = e.key.split('_');
    e.date = kp[0]; e.dept = kp[1]; e.shift = kp[2];
    delete e.loadFail; delete e.leases;
    e.status = 'draft';
    e.submittedAt = null;
    var old = r ? JSON.parse(r.values[14]) : null;
    if (old && old.photoCounts) e.photoCounts = old.photoCounts;
    var rejected = 0, mine = 0;
    if (uid && TUNE_.sectionLocks) {
      /* pessimistic leg locks: a leg's values are accepted only from the device that holds its lease; every other leg keeps the stored values */
      var ls = leases_(e.key);
      legs_().forEach(function (l, i) {
        var holder = ls[i] && ls[i].u;
        if (holder === uid) { mine |= (1 << i); putLease_(e.key, i, uid, ls[i].n); return; }   /* heartbeat */
        if (legDiffers_(l, e, old)) rejected |= (1 << i);
        copyLeg_(l, old, e);
      });
    }
    writeEntry_(e, r ? r.row : 0);
    bump_();
    var res = {ok: true, mine: mine, rejected: rejected, sm: e.sm, ld: e.ld};
    if (rejected) res.restore = legSlice_(e, rejected);
    return res;
  },
  photo: function (p) {
    checkKey_(p.key);
    var m = /^data:image\/jpeg;base64,(.+)$/.exec(String(p.data || ''));
    if (!m) throw err_('invalid', 'Bad photo');
    var blob = Utilities.newBlob(Utilities.base64Decode(m[1]), 'image/jpeg', p.key + '_' + p.qid + '_' + Date.now() + '.jpg');
    var f = folder_().createFile(blob);
    f.setDescription(JSON.stringify({key: p.key, qid: p.qid, at: p.at}));
    return {ok: true, id: f.getId()};
  },
  photoGet: function (p) {
    var f = photoFile_(p.id);
    if (!f) throw err_('missing', 'Photo not found');
    return {ok: true, data: 'data:image/jpeg;base64,' + Utilities.base64Encode(f.getBlob().getBytes())};
  },
  photoDel: function (p) {
    var f = photoFile_(p.id);
    if (f) f.setTrashed(true);
    return {ok: true};
  },
  submit: function (p, cfg) {
    checkKey_(p.key);
    var r = findRow_(p.key);
    if (!r) throw err_('missing', 'Audit not found');
    var heldBy = TUNE_.sectionLocks ? othersMask_(leases_(p.key), String(p.uid || '')) : 0;
    if (heldBy) throw err_('held', 'Another person is still filling a section');
    var e = JSON.parse(r.values[14]);
    var missing = CHECKS.filter(function (q) { return typeof (e.scores || {})[q.id] !== 'number'; });
    if (missing.length) throw err_('incomplete', missing.length + ' checks not scored');
    var noRem = CHECKS.filter(function (q) { var v = e.scores[q.id]; return q.crit && (!String((e.remarks || {})[q.id] || '').trim() || !(((e.photos || {})[q.id] || []).length || (e.photoCounts || {})[q.id])); });
    if (noRem.length) throw err_('noremark', noRem.length + ' critical points need a remark and a photo');
    if (r.values[4] === 'submitted') throw err_('locked', 'Already submitted');
    e.status = 'submitted';
    e.submittedAt = Date.now();
    writeEntry_(e, r.row);
    writeDetail_(e);
    bump_();
    dropLeases_(p.key, allLegs_(), null);
    var cinema = cinema_(p);
    var res = {ok: true, submittedAt: e.submittedAt, recipient: cfg.recipient, emailed: false};
    res.__after = function (out) {                      /* runs after the write lock is released */
      try {
        if (!cfg.recipient) throw err_('norecipient', 'No report email address is set');
        sendReport_([e], cfg, cinemaName_(cinema) + ' · Food Safety Audit: ' + DEPTS[e.dept] + ' ' + SHIFTS[e.shift] + ' · ' + e.date, true, cinema);
        out.emailed = true;
        e.emailedAt = Date.now();
        withLock_(function () {
          var rr = findRow_(e.key);
          if (rr) { writeEntry_(e, rr.row); bump_(); }
          if (cfg.keepDays === 0) flushEntry_(e);
        });
      } catch (mailErr) { out.emailError = (mailErr && mailErr.code === 'norecipient') ? 'norecipient' : String(mailErr && mailErr.message || mailErr); }
    };
    return res;
  },
  testMail: function (p, cfg) {
    var sc = {};
    CHECKS.forEach(function (q) { sc[q.id] = q.max; });
    sc['5'] = 1; sc['12'] = 0; sc['47'] = 2;
    var now = Date.now();
    var e = {key: 'test', dept: 'kitchen', shift: 'morning', date: Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'), status: 'submitted', submittedAt: now,
      emp: {name: 'TEST USER', desig: 'Test', id: 'T-000'}, scores: sc,
      remarks: {'5': 'Sample remark for a shortfall.', '12': 'Sample remark.', '47': 'Critical sample remark.'},
      photos: {'5': [{id: 'test1', at: now}, {id: 'test2', at: now}], '12': [{id: 'test3', at: now}], '47': [{id: 'test4', at: now}]}};
    sendReport_([e], cfg, '[TEST] ' + cinemaName_(cinema_(p)) + ' · Food Safety Audit email check', true, cinema_(p));
    return {ok: true, recipient: cfg.recipient};
  },
  emailReport: function (p, cfg) {
    var from = String(p.from || ''), to = String(p.to || '');
    var list = [];
    rows_('Audits').forEach(function (r) {
      if (String(r[1]) >= from && String(r[1]) <= to) { try { list.push(JSON.parse(r[14])); } catch (e) {} }
    });
    list.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : (a.key < b.key ? -1 : 1); });
    if (!list.length) throw err_('empty', 'No audits');
    sendReport_(list, cfg, cinemaName_(cinema_(p)) + ' · Food Safety Audit report: ' + from + ' to ' + to, false, cinema_(p));
    return {ok: true, recipient: cfg.recipient};
  },
  otpRequest: function (p, cfg) {
    var cache = CacheService.getScriptCache();
    var target = cfg.adminEmail || Session.getEffectiveUser().getEmail();   /* no admin email saved yet: the owner of this connection */
    if (!target) throw err_('noadmin', 'No admin email');
    if (cache.get('otp_wait')) throw err_('wait', 'Wait a minute');
    var code = ('' + Math.floor(100000 + Math.random() * 900000));
    cache.put('otp_hash', hash_(code), 600);
    cache.put('otp_tries', '0', 600);
    cache.put('otp_wait', '1', 60);
    MailApp.sendEmail({
      to: target,
      subject: 'Food Safety Audit admin code: ' + code,
      htmlBody: otpEmailHtml(code)
    });
    return {ok: true, sentTo: mask_(target), firstTime: !cfg.adminEmail};
  },
  otpVerify: function (p) {
    var cache = CacheService.getScriptCache();
    var h = cache.get('otp_hash');
    var tries = parseInt(cache.get('otp_tries') || '0', 10);
    if (!h) throw err_('expired', 'Code expired');
    if (tries >= 5) throw err_('locked', 'Too many tries');
    if (hash_(String(p.otp || '')) !== h) { cache.put('otp_tries', String(tries + 1), 600); throw err_('wrong', 'Wrong code'); }
    cache.remove('otp_hash');
    var token = Utilities.getUuid();
    cache.put('tok_' + token, '1', 21600);
    return {ok: true, token: token};
  },
  cfgGet: function (p, cfg) { return {ok: true, cfg: cfg}; },
  cfgSet: function (p) {
    var em = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (p.recipient && !em.test(p.recipient)) throw err_('invalid', 'Enter a valid report email address.');
    var k = parseInt(p.keepDays, 10);
    if (!(k >= 0 && k <= 365)) throw err_('invalid', 'Keep photos for 0 to 365 days.');
    var cur = cfg_();
    var lt = p.leaseTtl === undefined ? cur.leaseTtl : Number(p.leaseTtl), lw = p.lockWait === undefined ? cur.lockWait : Number(p.lockWait), rt = p.readTtl === undefined ? cur.readTtl : Number(p.readTtl);
    if (!(lt >= 60 && lt <= 1800)) throw err_('invalid', 'Section lock time-out must be 60 to 1800 seconds.');
    if (!(lw >= 2 && lw <= 30)) throw err_('invalid', 'Write wait must be 2 to 30 seconds.');
    if (!(rt >= 0 && rt <= 120)) throw err_('invalid', 'Read cache must be 0 to 120 seconds.');
    var c = {recipient: String(p.recipient || '').trim(), adminEmail: cur.adminEmail || '', keepDays: k, accessCode: String(p.accessCode || '').slice(0, 20),
      leaseTtl: Math.round(lt), lockWait: Math.round(lw), readTtl: Math.round(rt), sectionLocks: p.sectionLocks === undefined ? cur.sectionLocks : p.sectionLocks !== false};
    PropertiesService.getScriptProperties().setProperty('cfg', JSON.stringify(c));
    return {ok: true};
  },
  adminStats: function () {
    var files = folder_().getFiles(), n = 0, bytes = 0;
    while (files.hasNext()) { var f = files.next(); n++; bytes += f.getSize(); }
    return {ok: true, photos: n, mb: Math.round(bytes / 1048576 * 10) / 10, audits: rows_('Audits').length};
  },
  connections: function () {
    var out = {ok: true, account: '', sheet: {ok: false, name: ''}, drive: {ok: false, name: ''}, mail: {ok: false, left: 0}};
    try { out.account = Session.getEffectiveUser().getEmail(); } catch (e) {}
    try { out.sheet = {ok: true, name: SpreadsheetApp.getActiveSpreadsheet().getName()}; } catch (e) {}
    try { out.drive = {ok: true, name: folder_().getName()}; } catch (e) {}
    try { out.mail = {ok: true, left: MailApp.getRemainingDailyQuota()}; } catch (e) {}
    return out;
  },
  adminEmailSet: function (p) {
    var v = String(p.adminEmail || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || v.length > 120) throw err_('invalid', 'Enter a valid email address.');
    var c = cfg_();
    c.adminEmail = v;
    PropertiesService.getScriptProperties().setProperty('cfg', JSON.stringify(c));
    CacheService.getScriptCache().remove('otp_hash');   /* a code sent to the old address stops working */
    return {ok: true};
  },
  adminLocks: function () {
    var out = [];
    rows_('Audits').forEach(function (r) {
      if (r[4] === 'submitted') return;
      var ls = leases_(String(r[0]));
      Object.keys(ls).forEach(function (i) {
        out.push({key: String(r[0]), area: String(r[2]) + ' ' + String(r[3]) + ' ' + String(r[1]), leg: legs_()[i].name, name: ls[i].n || '', ageSec: Math.round((Date.now() - ls[i].t) / 1000)});
      });
    });
    return {ok: true, locks: out};
  },
  releaseLocks: function (p) {
    var n = 0;
    if (p.key) { checkKey_(p.key); n = Object.keys(leases_(p.key)).length; dropLeases_(p.key, allLegs_(), null); }
    else rows_('Audits').forEach(function (r) { if (r[4] !== 'submitted') { n += Object.keys(leases_(String(r[0]))).length; dropLeases_(String(r[0]), allLegs_(), null); } });
    return {ok: true, released: n};
  },
  clearCache: function () { bump_(); return {ok: true}; },
  flush: function (p, cfg) { var n = flushOlder_(cfg.keepDays); return {ok: true, audits: n}; }
};

function autoFlush() { TUNE_ = cfg_(); withLock_(function () { flushOlder_(cfg_().keepDays); }); }

/* ---------- helpers ---------- */
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function err_(code, message) { return {code: code, message: message}; }
function checkKey_(k) { if (!KEY_RE.test(String(k || ''))) throw err_('invalid', 'Bad key'); }
function cfg_() {
  var c = {};
  try { c = JSON.parse(PropertiesService.getScriptProperties().getProperty('cfg') || '{}'); } catch (e) {}
  return {
    recipient: c.recipient || DEFAULTS.recipient, adminEmail: c.adminEmail || DEFAULTS.adminEmail,
    keepDays: typeof c.keepDays === 'number' ? c.keepDays : DEFAULTS.keepDays, accessCode: c.accessCode || '',
    leaseTtl: num_(c.leaseTtl, 60, 1800, DEFAULTS.leaseTtl), lockWait: num_(c.lockWait, 2, 30, DEFAULTS.lockWait),
    readTtl: num_(c.readTtl, 0, 120, DEFAULTS.readTtl), sectionLocks: c.sectionLocks !== false
  };
}
function num_(v, lo, hi, d) { var n = Number(v); return (typeof v !== 'undefined' && v !== null && v !== '' && n >= lo && n <= hi) ? Math.round(n) : d; }
function requireToken_(t) {
  if (!t || CacheService.getScriptCache().get('tok_' + t) !== '1') throw err_('auth', 'Sign in again');
}
function hash_(s) { return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s + 'fsaudit')); }
function cinema_(p) { return String((p && p.cinema) || '').replace(/[\u0000-\u001f<>"]/g, ' ').trim().slice(0, 80); }
function cinemaName_(c) { return c || 'Select cinema'; }
function slug_(c) { return (String(c || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'audit').slice(0, 50); }
function mask_(e) { var a = e.split('@'); return a[0].slice(0, 2) + '***@' + a[1]; }
function sheet_(name, head) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.getRange(1, 1, sh.getMaxRows(), 2).setNumberFormat('@');
  }
  return sh;
}
function rows_(name) {
  var sh = sheet_(name, name === 'Audits' ? AUDIT_HEAD : DETAIL_HEAD);
  var n = sh.getLastRow() - 1;
  return n > 0 ? sh.getRange(2, 1, n, sh.getLastColumn()).getValues() : [];
}
function findRow_(key) {
  var sh = sheet_('Audits', AUDIT_HEAD);
  var n = sh.getLastRow() - 1;
  if (n < 1) return null;
  var keys = sh.getRange(2, 1, n, 1).getValues();
  for (var i = 0; i < n; i++) {
    if (String(keys[i][0]) === key) return {row: i + 2, values: sh.getRange(i + 2, 1, 1, AUDIT_HEAD.length).getValues()[0]};
  }
  return null;
}
function calc_(e) {
  var got = 0, crit = 0;
  CHECKS.forEach(function (q) {
    var s = (e.scores || {})[q.id];
    if (typeof s === 'number') { got += s; if (s < q.max && q.crit) crit++; }
  });
  return {got: got, pct: Math.round(got / TOTAL * 100), crit: crit};
}
function writeEntry_(e, row) {
  var sh = sheet_('Audits', AUDIT_HEAD);
  var c = calc_(e), m = e.emp || {};
  e.updatedAt = Date.now();
  stamp_(e);
  var vals = [e.key, e.date, DEPTS[e.dept], SHIFTS[e.shift], e.status, m.name || '', m.desig || '', m.id || '', e.submittedAt || '', c.got, c.pct, c.crit, e.updatedAt, e.photosFlushedAt || '', JSON.stringify(e)];
  if (vals[14].length > 49000) throw err_('invalid', 'Remarks are too long');
  if (!row) row = sh.getLastRow() + 1;
  sh.getRange(row, 1, 1, vals.length).setValues([vals]);
}
function writeDetail_(e) {
  var sh = sheet_('Detail', DETAIL_HEAD);
  var n = sh.getLastRow() - 1;
  if (n > 0) {
    var keys = sh.getRange(2, 1, n, 1).getValues();
    for (var i = n - 1; i >= 0; i--) if (String(keys[i][0]) === e.key) sh.deleteRow(i + 2);
  }
  var m = e.emp || {};
  var done = fmtMs_(e.submittedAt);
  var rows = CHECKS.map(function (q) {
    var s = (e.scores || {})[q.id];
    return [e.key, e.date, DEPTS[e.dept], SHIFTS[e.shift], m.name || '', m.desig || '', m.id || '', done, q.id, q.section, q.text, q.crit ? 'Yes' : 'No', q.max, typeof s === 'number' ? s : '', (e.remarks || {})[q.id] || '', photoN_(e, q.id)];
  });
  sh.getRange(sh.getLastRow() + 1, 1, rows.length, DETAIL_HEAD.length).setValues(rows);
}
function fmtMs_(ms) { return ms ? Utilities.formatDate(new Date(ms), TZ, 'dd MMM yyyy, hh:mm a') : ''; }
function photoN_(e, qid) { var l = (e.photos || {})[qid]; return (l && l.length) || ((e.photoCounts || {})[qid]) || 0; }

/* ---------- concurrency: read/write split, leg leases (pessimistic), TTL, bitmasks ----------
 * Read side : list/get are served from a cached snapshot (CacheService, TUNE_.readTtl) and never take the write lock.
 *             Every write bumps a version number, so the next read rebuilds the snapshot. Stale reads are bounded by the Read cache setting (Admin).
 * Write side: one short script lock (Write wait setting, fails fast instead of queueing forever) around sheet writes only.
 *             Slow work (mail, Drive photos) runs outside the lock.
 * Pessimistic lock: each checklist section is a "leg". A device must hold the leg's lease to change it. The lease is a cache
 *             entry with a TTL (Section lock time-out setting), renewed by claims and saves, so a closed phone frees its legs by itself.
 * Bitmasks  : bit j of sm[i] = point j of leg i is scored; bit i of ld = leg i fully scored; claim/busy/mine/rejected are leg masks. */
var LEGS_ = null;
function legs_() {
  if (LEGS_) return LEGS_;
  var out = [], at = {};
  CHECKS.forEach(function (q) {
    if (at[q.section] === undefined) { at[q.section] = out.length; out.push({name: q.section, ids: []}); }
    out[at[q.section]].ids.push(q.id);
  });
  LEGS_ = out;
  return out;
}
function allLegs_() { return (1 << legs_().length) - 1; }
function legMasks_(e) {
  return legs_().map(function (l) {
    var m = 0;
    l.ids.forEach(function (id, j) { if (typeof (e.scores || {})[id] === 'number') m |= (1 << j); });
    return m;
  });
}
function doneMask_(e) {
  var ms = legMasks_(e), d = 0;
  legs_().forEach(function (l, i) { if (ms[i] === (1 << l.ids.length) - 1) d |= (1 << i); });
  return d;
}
function stamp_(e) { e.sm = legMasks_(e); e.ld = doneMask_(e); e.nl = legs_().length; }
function legDiffers_(l, a, b) {
  return l.ids.some(function (id) {
    return JSON.stringify([((a || {}).scores || {})[id], ((a || {}).remarks || {})[id] || '', (((a || {}).photos || {})[id] || []).length]) !==
           JSON.stringify([((b || {}).scores || {})[id], ((b || {}).remarks || {})[id] || '', (((b || {}).photos || {})[id] || []).length]);
  });
}
function copyLeg_(l, from, to) {
  to.scores = to.scores || {}; to.remarks = to.remarks || {}; to.photos = to.photos || {};
  l.ids.forEach(function (id) {
    ['scores', 'remarks', 'photos'].forEach(function (k) {
      var src = (from && from[k]) ? from[k][id] : undefined;
      if (src === undefined || src === '' || (k === 'photos' && !src.length)) delete to[k][id]; else to[k][id] = src;
    });
  });
}
function legSlice_(e, mask) {
  var out = {scores: {}, remarks: {}, photos: {}};
  legs_().forEach(function (l, i) {
    if (!((mask >> i) & 1)) return;
    l.ids.forEach(function (id) {
      ['scores', 'remarks', 'photos'].forEach(function (k) { if (e[k] && e[k][id] !== undefined) out[k][id] = e[k][id]; });
    });
  });
  return out;
}
function leases_(key) {
  var ks = legs_().map(function (l, i) { return 'ls_' + key + '_' + i; });
  var got = CacheService.getScriptCache().getAll(ks), out = {};
  ks.forEach(function (k, i) { if (got[k]) { try { out[i] = JSON.parse(got[k]); } catch (e) {} } });
  return out;
}
function overlayLeases_(entries) {
  var live = entries.filter(function (e) { return e.status !== 'submitted'; });
  if (!live.length) return;
  var ks = [];
  live.forEach(function (e) { legs_().forEach(function (l, i) { ks.push('ls_' + e.key + '_' + i); }); });
  var got = CacheService.getScriptCache().getAll(ks);
  live.forEach(function (e) {
    var o = {};
    legs_().forEach(function (l, i) { var v = got['ls_' + e.key + '_' + i]; if (v) { try { o[i] = JSON.parse(v); } catch (x) {} } });
    e.leases = o;
  });
}
function othersMask_(ls, uid) {
  var m = 0;
  Object.keys(ls).forEach(function (i) { if (ls[i].u !== uid) m |= (1 << Number(i)); });
  return m;
}
function putLease_(key, i, uid, name) {
  CacheService.getScriptCache().put('ls_' + key + '_' + i, JSON.stringify({u: uid, n: String(name || '').slice(0, 40), t: Date.now()}), TUNE_.leaseTtl);
}
function dropLeases_(key, mask, uid) {
  var c = CacheService.getScriptCache(), ls = leases_(key);
  Object.keys(ls).forEach(function (i) { if (((mask >> i) & 1) && (uid === null || ls[i].u === uid)) c.remove('ls_' + key + '_' + i); });
}
function ver_() { return CacheService.getScriptCache().get('rm_ver') || '0'; }
function bump_() { CacheService.getScriptCache().put('rm_ver', String(Date.now()) + Math.floor(Math.random() * 1000), 21600); }
function readCached_(k, build) {
  if (!TUNE_.readTtl) return build();
  var c = CacheService.getScriptCache(), ck = 'rm_' + ver_() + '_' + k, hit = c.get(ck);
  if (hit) { try { return JSON.parse(hit); } catch (e) {} }
  var v = build(), s = JSON.stringify(v);
  if (s.length < 90000) c.put(ck, s, TUNE_.readTtl);
  return v;
}
function withLock_(fn) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(TUNE_.lockWait * 1000); } catch (e) { throw err_('retry', 'Server busy, try again'); }
  try { return fn(); } finally { lock.releaseLock(); }
}

/* ---------- photos ---------- */
function folder_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('photoFolder');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  var f = DriveApp.createFolder('Food Safety Audit Photos');
  props.setProperty('photoFolder', f.getId());
  return f;
}
var TEST_PNG_ = 'iVBORw0KGgoAAAANSUhEUgAAALQAAAB4AgMAAAAmiTBuAAAADFBMVEXa2tofqlk/Pz8AAACmDe38AAABPklEQVR42u3TP0tCYRTH8e/1mtgg3kFCGsI3UDk0Kj5CEDQUBK0h9AJq8AU87Q2+AIlbY0stOkTRIzlGSBTUVBcahMA/S9T1z20I1EZXOWc6wwfO7xw41i5TVAjRokWLFi1atGjRokWLFi1a9GxrK5CbzJCupVVWOU69dF9bJmd79pHpguMZL03nJ91dtSd1vPzXZurxAr7/lrk9fGGgW/qizHuv0Dup/kuShDZ9k3RR+CE91IU1bOXhJsPF72zC4N3Mp0faAa1TqZiDwbJAKYBtnFjlOHE3ONv81Ofu5JZLKlqK6q5rjTfyDWwQXNp71RXy4ySdvzas4o0gCMAYAJ9OB4a6odYfJ3M32ywwpwGIDHVIuwCvFJpXfKm+uR4dJQzdg53MaH4kMrDyOYBK8XTr2bQWP/afHuR3RE9TvyCXZMHwIBR8AAAAAElFTkSuQmCC';
function photoFile_(id) {
  if (String(id).indexOf('test') === 0) {
    var tb = Utilities.newBlob(Utilities.base64Decode(TEST_PNG_), 'image/png', String(id) + '.png');
    return {getSize: function () { return tb.getBytes().length; }, getBlob: function () { return tb; }};
  }
  try {
    var f = DriveApp.getFileById(String(id));
    var fid = folder_().getId();
    var ps = f.getParents();
    while (ps.hasNext()) if (ps.next().getId() === fid) return f;
  } catch (e) {}
  return null;
}
function flushEntry_(e) {
  var counts = e.photoCounts || {}, any = false;
  Object.keys(e.photos || {}).forEach(function (q) {
    (e.photos[q] || []).forEach(function (p) {
      var f = photoFile_(p.id);
      if (f) f.setTrashed(true);
      counts[q] = (counts[q] || 0) + 1;
      any = true;
    });
  });
  if (!any) return false;
  e.photos = {};
  e.photoCounts = counts;
  e.photosFlushedAt = Date.now();
  var r = findRow_(e.key);
  if (r) { writeEntry_(e, r.row); bump_(); }
  return true;
}
function flushOlder_(keepDays) {
  var cutoff = Date.now() - keepDays * 86400000, n = 0;
  rows_('Audits').forEach(function (r) {
    if (r[4] !== 'submitted' || !r[8] || Number(r[8]) > cutoff) return;
    try { var e = JSON.parse(r[14]); if (flushEntry_(e)) n++; } catch (x) {}
  });
  return n;
}

/* ---------- email and Excel ---------- */
function sendReport_(list, cfg, subject, withPhotos, cinema) {
  if (!cfg.recipient) throw err_('norecipient', 'No report email address is set');
  var inline = {}, budget = 16 * 1048576, idx = 0, skipped = 0;
  var ctx = {
    CHECKS: CHECKS, DEPTS: DEPTS, SHIFTS: SHIFTS, TOTAL: TOTAL,
    calc: function (e) { return calc_(e); },
    stamp: fmtMs_,
    title: 'Food Safety Audit',
    cinema: cinemaName_(cinema),
    compact: list.length > 2,
    photos: function (e, qid) {
      var out = [];
      ((e.photos || {})[qid] || []).forEach(function (p) {
        var f = photoFile_(p.id);
        if (!f) return;
        if (withPhotos !== false && budget > f.getSize()) {
          budget -= f.getSize();
          var cid = 'photo' + (++idx);
          inline[cid] = f.getBlob().setName(cid + '.jpg');
          out.push({src: 'cid:' + cid, at: p.at});
        } else skipped++;
      });
      return out;
    },
    flushedNote: function (e) {
      var n = 0;
      Object.keys(e.photoCounts || {}).forEach(function (k) { n += e.photoCounts[k]; });
      return n ? n + ' photo(s) were flushed from storage after the retention period.' : '';
    }
  };
  var html = buildEmailHtml(list, ctx);
  if (skipped) html = html.replace('</table></td></tr></table>', '</table></td></tr></table>').replace('Excel workbook attached', 'Excel workbook attached (' + skipped + ' photo(s) left out to keep the email small)');
  var attach = [buildXlsx_(list, cinema)];
  MailApp.sendEmail({
    to: cfg.recipient, subject: subject, name: cinemaName_(cinema),
    body: cinemaName_(cinema) + ' · Food Safety Audit report. The formatted report needs an HTML-capable mail app. The Excel workbook is attached.',
    htmlBody: html, inlineImages: inline, attachments: attach
  });
}

function jpegSize_(b) {
  var i = 2;
  while (i + 9 < b.length) {
    if ((b[i] & 255) !== 255) { i++; continue; }
    var m = b[i + 1] & 255;
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) return {h: ((b[i + 5] & 255) << 8) | (b[i + 6] & 255), w: ((b[i + 7] & 255) << 8) | (b[i + 8] & 255)};
    if (m === 0xD8 || m === 0x01 || (m >= 0xD0 && m <= 0xD7)) { i += 2; continue; }
    i += 2 + (((b[i + 2] & 255) << 8) | (b[i + 3] & 255));
  }
  return {w: 4, h: 3};
}

var X_NAVY = '#14285a', X_HEAD = '#2a4080', X_GOLD = '#f2b705', X_LIGHT = '#f5f7fb', X_LINE = '#d5dae6';
var X_GOOD = {fg: '#1a7f37', bg: '#e3f4e8'}, X_WARN = {fg: '#b26a00', bg: '#fff1d6'}, X_BAD = {fg: '#c62828', bg: '#fde8e8'};
function xTone_(p) { return p >= 90 ? X_GOOD : p >= 75 ? X_WARN : X_BAD; }
function xScore_(s, max) { return s === max ? X_GOOD : s === 0 ? X_BAD : X_WARN; }
function xDate_(s) { var a = s.split('-'); return Utilities.formatDate(new Date(+a[0], +a[1] - 1, +a[2], 12), TZ, 'dd MMM yyyy'); }
function xBanner_(sh, title, sub, cols) {
  sh.setHiddenGridlines(true);
  sh.getRange(1, 1, 2, cols).setBackground(X_NAVY).setFontColor('#ffffff').setFontFamily('Arial');
  sh.getRange(1, 1, 1, cols).merge().setValue(title).setFontSize(16).setFontWeight('bold').setVerticalAlignment('middle');
  sh.getRange(2, 1, 1, cols).merge().setValue(sub).setFontSize(10).setFontColor('#cdd6ee').setVerticalAlignment('middle');
  sh.getRange(3, 1, 1, cols).setBackground(X_GOLD);
  sh.setRowHeight(1, 32); sh.setRowHeight(2, 20); sh.setRowHeight(3, 4);
}
function xHeader_(sh, row, names) {
  sh.getRange(row, 1, 1, names.length).setValues([names]).setBackground(X_HEAD).setFontColor('#ffffff').setFontWeight('bold').setFontFamily('Arial').setFontSize(10)
    .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true).setBorder(true, true, true, true, true, true, X_LINE, SpreadsheetApp.BorderStyle.SOLID);
  sh.setRowHeight(row, 26);
}
/* rows: array of arrays; style(rowIndex, colIndex, value) -> {bg, fg, bold} or null. Writes in one batch. */
function xBody_(sh, row, ncols, rows, style, center, wrap, widths) {
  if (!rows.length) return;
  var bgs = [], fcs = [], fws = [];
  rows.forEach(function (r, i) {
    var b = [], f = [], w = [];
    for (var c = 0; c < ncols; c++) {
      var st = style(i, c, r[c]) || {};
      b.push(st.bg || (i % 2 ? X_LIGHT : '#ffffff')); f.push(st.fg || '#1f2937'); w.push(st.bold ? 'bold' : 'normal');
    }
    bgs.push(b); fcs.push(f); fws.push(w);
  });
  var rng = sh.getRange(row, 1, rows.length, ncols);
  rng.setValues(rows).setBackgrounds(bgs).setFontColors(fcs).setFontWeights(fws).setFontFamily('Arial').setFontSize(10).setVerticalAlignment('top')
    .setBorder(true, true, true, true, true, true, X_LINE, SpreadsheetApp.BorderStyle.SOLID);
  (center || []).forEach(function (c) { sh.getRange(row, c, rows.length, 1).setHorizontalAlignment('center'); });
  (wrap || []).forEach(function (c) { sh.getRange(row, c, rows.length, 1).setWrap(true); });
  widths.forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
}

function buildXlsx_(list, cinema) {
  var ss = SpreadsheetApp.create('tmp-audit-export');
  try {
    var sub = cinemaName_(cinema) + ' · FSSAI format · generated ' + fmtMs_(Date.now());
    /* Summary */
    var s1 = ss.getSheets()[0];
    s1.setName('Summary');
    xBanner_(s1, cinemaName_(cinema) + ' · Food Safety Audit', sub, 12);
    xHeader_(s1, 5, ['Date', 'Area', 'Shift', 'Employee', 'Designation', 'Employee ID', 'Completed at', 'Score', 'Max', 'Percent', 'Shortfalls', 'Critical shortfalls']);
    var sumRows = [], pcts = [];
    list.forEach(function (e) {
      var c = calc_(e), m = e.emp || {}, gaps = 0;
      CHECKS.forEach(function (q) { var s = (e.scores || {})[q.id]; if (typeof s === 'number' && s < q.max) gaps++; });
      pcts.push(c.pct);
      sumRows.push([xDate_(e.date), DEPTS[e.dept], SHIFTS[e.shift], m.name || '', m.desig || '', m.id || '', e.status === 'submitted' ? fmtMs_(e.submittedAt) : 'Draft', c.got, TOTAL, c.pct / 100, gaps, c.crit]);
    });
    xBody_(s1, 6, 12, sumRows, function (i, c, v) {
      if (c === 9) { var t = xTone_(pcts[i]); return {bg: t.bg, fg: t.fg, bold: true}; }
      if (c === 10 && v) return {fg: X_WARN.fg, bold: true};
      if (c === 11 && v) return {bg: X_BAD.bg, fg: X_BAD.fg, bold: true};
      return null;
    }, [8, 9, 10, 11, 12], [], [90, 90, 80, 150, 120, 90, 140, 60, 50, 70, 80, 100]);
    if (sumRows.length) s1.getRange(6, 10, sumRows.length, 1).setNumberFormat('0%');
    var avg = pcts.length ? Math.round(pcts.reduce(function (a, b) { return a + b; }, 0) / pcts.length) : 0;
    var tr = 7 + sumRows.length;
    s1.getRange(tr, 1, 1, 7).merge().setValue('Average compliance across ' + list.length + ' audit' + (list.length === 1 ? '' : 's')).setHorizontalAlignment('right').setFontWeight('bold').setFontColor(X_NAVY).setFontFamily('Arial');
    var at = xTone_(avg);
    s1.getRange(tr, 10).setValue(avg / 100).setNumberFormat('0%').setBackground(at.bg).setFontColor(at.fg).setFontWeight('bold').setFontFamily('Arial').setHorizontalAlignment('center');
    s1.setFrozenRows(5);
    if (sumRows.length) s1.getRange(5, 1, sumRows.length + 1, 12).createFilter();

    /* Detail */
    var s2 = ss.insertSheet('Detail');
    xBanner_(s2, 'Checklist detail · one row per point', sub, 14);
    xHeader_(s2, 5, ['Date', 'Area', 'Shift', 'Employee', 'Point', 'Section', 'Check', 'Critical', 'Max', 'Score', 'Status', 'Remark', 'Photos', 'Completed at']);
    var det = [], bands = [];
    list.forEach(function (e) {
      var m = e.emp || {}, last = '', band = false;
      CHECKS.forEach(function (q) {
        if (q.section !== last) { last = q.section; band = !band; }
        var s = (e.scores || {})[q.id], has = typeof s === 'number';
        det.push([xDate_(e.date), DEPTS[e.dept], SHIFTS[e.shift], m.name || '', q.id, q.section, q.text, q.crit ? 'Yes' : 'No', q.max, has ? s : '', !has ? 'Not scored' : s === q.max ? 'Full marks' : s === 0 ? 'Failed' : 'Partial', (e.remarks || {})[q.id] || '', photoN_(e, q.id), e.status === 'submitted' ? fmtMs_(e.submittedAt) : 'Draft']);
        bands.push(band);
      });
    });
    xBody_(s2, 6, 14, det, function (i, c, v) {
      var r = det[i], base = bands[i] ? X_LIGHT : '#ffffff';
      var has = r[9] !== '';
      if ((c === 9 || c === 10) && has) { var t = xScore_(r[9], r[8]); return {bg: t.bg, fg: t.fg, bold: true}; }
      if (c === 7 && v === 'Yes') return {bg: base, fg: X_BAD.fg, bold: true};
      return {bg: base};
    }, [5, 8, 9, 10, 11, 13], [6, 7, 12], [90, 80, 70, 120, 50, 170, 380, 60, 45, 50, 90, 280, 55, 140]);
    s2.setFrozenRows(5); s2.setFrozenColumns(4);
    if (det.length) s2.getRange(5, 1, det.length + 1, 14).createFilter();

    /* Shortfalls */
    var s3 = ss.insertSheet('Shortfalls');
    xBanner_(s3, 'Shortfalls · points that did not score full marks', sub, 9);
    xHeader_(s3, 5, ['Date', 'Area · shift', 'Employee', 'Point', 'Check', 'Critical', 'Score', 'Remark', 'Photos']);
    var sf = [], sfTone = [];
    list.forEach(function (e) {
      var m = e.emp || {};
      CHECKS.forEach(function (q) {
        var s = (e.scores || {})[q.id];
        if (typeof s !== 'number' || s >= q.max) return;
        sf.push([xDate_(e.date), DEPTS[e.dept] + ' · ' + SHIFTS[e.shift], m.name || '', q.id, q.text, q.crit ? 'Yes' : 'No', s + ' / ' + q.max, (e.remarks || {})[q.id] || '', photoN_(e, q.id)]);
        sfTone.push(xScore_(s, q.max));
      });
    });
    if (sf.length) {
      xBody_(s3, 6, 9, sf, function (i, c, v) {
        if (c === 6) return {bg: sfTone[i].bg, fg: sfTone[i].fg, bold: true};
        if (c === 5 && v === 'Yes') return {fg: X_BAD.fg, bold: true};
        return null;
      }, [4, 6, 7, 9], [5, 8], [90, 140, 120, 50, 380, 60, 70, 300, 55]);
      s3.getRange(5, 1, sf.length + 1, 9).createFilter();
    } else {
      s3.getRange(6, 1, 1, 9).merge().setValue('No shortfalls. All points scored full marks.').setBackground(X_GOOD.bg).setFontColor(X_GOOD.fg).setFontWeight('bold').setHorizontalAlignment('center').setFontFamily('Arial');
      s3.setRowHeight(6, 28);
    }
    s3.setFrozenRows(5);

    /* Photos */
    var s4 = ss.insertSheet('Photos');
    xBanner_(s4, 'Photos · stamped with date and time taken', sub, 4);
    xHeader_(s4, 5, ['Audit', 'Point and check', 'Taken at', 'Photo']);
    [170, 330, 140, 330].forEach(function (w, i) { s4.setColumnWidth(i + 1, w); });
    var r4 = 6, count = 0;
    list.forEach(function (e) {
      CHECKS.forEach(function (q) {
        ((e.photos || {})[q.id] || []).forEach(function (p) {
          if (count >= 40) return;
          var f = photoFile_(p.id);
          if (!f) return;
          var blob = f.getBlob(), dim = jpegSize_(blob.getBytes());
          var w = 300, h = Math.round(w * dim.h / dim.w);
          if (h > 240) { h = 240; w = Math.round(h * dim.w / dim.h); }
          s4.getRange(r4, 1, 1, 3).setValues([[e.date + ' · ' + DEPTS[e.dept] + ' ' + SHIFTS[e.shift], 'Point ' + q.id + ': ' + q.text, fmtMs_(p.at)]]).setWrap(true).setVerticalAlignment('middle').setFontFamily('Arial').setFontSize(10);
          s4.getRange(r4, 1, 1, 4).setBorder(true, true, true, true, true, true, X_LINE, SpreadsheetApp.BorderStyle.SOLID);
          s4.setRowHeight(r4, Math.max(h + 16, 60));
          s4.insertImage(blob, 4, r4, 8, 8).setWidth(w).setHeight(h);
          r4++; count++;
        });
      });
    });
    if (!count) {
      s4.getRange(6, 1, 1, 4).merge().setValue('No photos stored for these audits (none taken, or already flushed).').setFontColor('#667085').setHorizontalAlignment('center').setFontFamily('Arial');
      s4.setRowHeight(6, 28);
    }
    s4.setFrozenRows(5);
    SpreadsheetApp.flush();
    var resp = UrlFetchApp.fetch('https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=xlsx', {headers: {Authorization: 'Bearer ' + ScriptApp.getOAuthToken()}});
    var name = slug_(cinemaName_(cinema)) + '-audit-' + (list.length === 1 ? list[0].key : list[0].date + '_to_' + list[list.length - 1].date) + '.xlsx';
    return resp.getBlob().setName(name);
  } finally {
    DriveApp.getFileById(ss.getId()).setTrashed(true);
  }
}


/* ---------- shared email layout ---------- */
/* Shared email layout. ctx: CHECKS, DEPTS, SHIFTS, TOTAL, calc(e), stamp(ms), photos(e,qid)->[{src,at}], title, note */
function emailEsc(x) { return String(x === null || x === undefined ? '' : x).replace(/[&<>"]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); }
function emailTone(p) { return p >= 90 ? {fg: '#1a7f37', bg: '#e3f4e8', name: 'Good'} : p >= 75 ? {fg: '#b26a00', bg: '#fff1d6', name: 'Watch'} : {fg: '#c62828', bg: '#fde8e8', name: 'Action'}; }
function emailPill(txt, fg, bg) { return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right" style="display:inline-table"><tr><td bgcolor="' + bg + '" style="padding:3px 10px;border-radius:12px;color:' + fg + ';font-weight:bold;font-size:12px;white-space:nowrap">' + txt + '</td></tr></table>'; }
function emailRemark(e, q) {
  var r = (e.remarks || {})[q.id];
  if (!r && !q.crit) return '';
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px"><tr><td bgcolor="#f5f7fb" style="padding:8px 10px;border-radius:6px;font-size:13px;color:#344054;line-height:1.4"><b>Remark:</b> ' + (emailEsc(r) || '<i style="color:#98a2b3">none</i>') + '</td></tr></table>';
}
function emailPhotoGrid(items, ctx) {
  if (!items.length) return '';
  var cols = 3, h = ['<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="table-layout:fixed;margin-top:8px">'];
  for (var i = 0; i < items.length; i += cols) {
    h.push('<tr>');
    for (var j = 0; j < cols; j++) {
      var it = items[i + j];
      if (!it) { h.push('<td width="33%" style="padding:4px"></td>'); continue; }
      var inner = it.src
        ? '<img src="' + it.src + '" width="180" alt="Audit photo" style="display:block;width:100%;height:auto;border-radius:4px;border:0">'
        : '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" height="96" bgcolor="#f5f7fb" style="font:12px Arial,sans-serif;color:#475467;border-radius:4px">&#128247;<br><b>Photo ' + (it.n || (i + j + 1)) + '</b><br><span style="font-size:11px;color:#667085">see attachment</span></td></tr></table>';
      h.push('<td width="33%" valign="top" style="padding:3px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border:1px solid #d5dae6;border-radius:6px;border-collapse:separate"><tr><td style="padding:4px">' + inner + '</td></tr><tr><td align="center" style="padding:2px 4px 6px;font:11px Arial,sans-serif;color:#667085">' + emailEsc(ctx.stamp(it.at)) + '</td></tr></table></td>');
    }
    h.push('</tr>');
  }
  h.push('</table>');
  return h.join('');
}
function buildEmailHtml(list, ctx) {
  var F = 'font-family:Arial,Helvetica,sans-serif;';
  var h = [];
  h.push('<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef1f6" style="background:#eef1f6"><tr><td align="center" style="padding:18px 8px">');
  h.push('<table role="presentation" width="680" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:680px;background:#ffffff;border-radius:12px;border-collapse:separate;overflow:hidden;' + F + 'color:#1f2937">');
  h.push('<tr><td bgcolor="#14285a" style="background:#14285a;padding:22px 24px;border-bottom:4px solid #f2b705"><div style="' + F + 'font-size:12px;letter-spacing:1px;color:#f2b705;font-weight:bold">' + emailEsc(String(ctx.cinema || 'Select cinema').toUpperCase()) + '</div><div style="' + F + 'font-size:22px;font-weight:bold;color:#ffffff;margin-top:4px">' + emailEsc(ctx.title || 'Food Safety Audit') + '</div><div style="' + F + 'font-size:13px;color:#cdd6ee;margin-top:4px">FSSAI format checklist · ' + list.length + ' audit' + (list.length === 1 ? '' : 's') + '</div></td></tr>');
  if (list.length > 1) {
    h.push('<tr><td style="padding:20px 24px 4px"><div style="font-size:15px;font-weight:bold;color:#14285a;margin-bottom:8px">Overview</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;border:1px solid #e1e5ee;border-radius:8px;border-collapse:separate;overflow:hidden">');
    h.push('<tr bgcolor="#f5f7fb"><td style="padding:8px 10px;color:#667085;font-weight:bold">Date</td><td style="padding:8px 10px;color:#667085;font-weight:bold">Area · shift</td><td style="padding:8px 10px;color:#667085;font-weight:bold">Employee</td><td align="right" style="padding:8px 10px;color:#667085;font-weight:bold">Score</td></tr>');
    list.forEach(function (e) {
      var c = ctx.calc(e), t = emailTone(c.pct), m = e.emp || {};
      h.push('<tr><td style="padding:8px 10px;border-top:1px solid #eef0f5">' + emailEsc(e.date) + '</td><td style="padding:8px 10px;border-top:1px solid #eef0f5">' + ctx.DEPTS[e.dept] + ' · ' + ctx.SHIFTS[e.shift] + '</td><td style="padding:8px 10px;border-top:1px solid #eef0f5">' + emailEsc(m.name) + '</td><td align="right" style="padding:8px 10px;border-top:1px solid #eef0f5">' + emailPill(c.got + '/' + ctx.TOTAL + ' · ' + c.pct + '%', t.fg, t.bg) + '</td></tr>');
    });
    h.push('</table></td></tr>');
  }
  list.forEach(function (e) {
    var c = ctx.calc(e), t = emailTone(c.pct), m = e.emp || {};
    var gaps = [];
    ctx.CHECKS.forEach(function (q) { var s = (e.scores || {})[q.id]; if (typeof s === 'number' && s < q.max) gaps.push({q: q, s: s}); });
    h.push('<tr><td style="padding:24px 24px 0"><div style="font-size:19px;font-weight:bold;color:#14285a">' + ctx.DEPTS[e.dept] + ' · ' + ctx.SHIFTS[e.shift] + '</div><div style="font-size:13px;color:#667085;margin-top:2px">' + emailEsc(e.date) + (e.status === 'submitted' ? ' · completed ' + emailEsc(ctx.stamp(e.submittedAt)) : ' · draft') + '</div></td></tr>');
    h.push('<tr><td style="padding:12px 24px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="4" border="0" style="table-layout:fixed;width:100%"><tr>');
    var kp = [[c.pct + '%', 'Score', t.fg], [c.got + '/' + ctx.TOTAL, 'Points', '#14285a'], [String(gaps.length), 'Gaps', gaps.length ? '#b26a00' : '#1a7f37'], [String(c.crit), 'Critical', c.crit ? '#c62828' : '#1a7f37']];
    kp.forEach(function (k) {
      h.push('<td width="25%" align="center" bgcolor="#f5f7fb" style="background:#f5f7fb;border:1px solid #e1e5ee;border-radius:8px;padding:8px 0"><div style="font-size:16px;font-weight:bold;color:' + k[2] + ';white-space:nowrap">' + k[0] + '</div><div style="font-size:10px;color:#667085;margin-top:2px;text-transform:uppercase;letter-spacing:.3px;white-space:nowrap">' + k[1] + '</div></td>');
    });
    h.push('</tr></table></td></tr>');
    h.push('<tr><td style="padding:12px 24px 0;font-size:13px;color:#475467"><b style="color:#1f2937">' + emailEsc(m.name) + '</b> · ' + emailEsc(m.desig) + ' · Employee ID ' + emailEsc(m.id) + '</td></tr>');
    var shown = {};
    if (gaps.length) {
      h.push('<tr><td style="padding:20px 24px 4px"><div style="font-size:15px;font-weight:bold;color:#c62828">Needs attention (' + gaps.length + ')</div></td></tr>');
      gaps.forEach(function (g) {
        var q = g.q, tone = g.s === 0 ? '#c62828' : '#b26a00', ph = ctx.photos(e, q.id);
        shown[q.id] = 1;
        h.push('<tr><td style="padding:6px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e1e5ee;border-left:5px solid ' + tone + ';border-radius:8px;border-collapse:separate"><tr><td style="padding:12px 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="font-size:12px;font-weight:bold;color:#667085">POINT ' + q.id + (q.crit ? ' &nbsp;' + emailPill('CRITICAL', '#c62828', '#fde8e8') : '') + '</td><td align="right">' + emailPill(g.s + ' / ' + q.max, tone, g.s === 0 ? '#fde8e8' : '#fff1d6') + '</td></tr></table><div style="font-size:14px;color:#1f2937;margin-top:6px;line-height:1.4">' + emailEsc(q.text) + '</div>' + emailRemark(e, q) + '' + emailPhotoGrid(ph, ctx) + '</td></tr></table></td></tr>');
      });
    } else {
      h.push('<tr><td style="padding:18px 24px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#e3f4e8" style="padding:12px 14px;border-radius:8px;color:#1a7f37;font-weight:bold;font-size:14px">All points scored full marks.</td></tr></table></td></tr>');
    }
    if (ctx.compact) {
      h.push('<tr><td style="padding:14px 24px 0;font-size:12px;color:#98a2b3">Full 49-point checklist for this audit is in the attached Excel (Detail sheet).</td></tr>');
    } else {
    h.push('<tr><td style="padding:22px 24px 6px"><div style="font-size:15px;font-weight:bold;color:#14285a">Full checklist</div></td></tr>');
    h.push('<tr><td style="padding:0 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:13px;border:1px solid #e1e5ee;border-radius:8px;border-collapse:separate;overflow:hidden">');
    var sec = '';
    ctx.CHECKS.forEach(function (q) {
      if (q.section !== sec) { sec = q.section; h.push('<tr bgcolor="#14285a"><td colspan="3" style="background:#14285a;color:#ffffff;padding:8px 10px;font-weight:bold;font-size:12px;letter-spacing:.3px">' + emailEsc(sec) + '</td></tr>'); }
      var s = (e.scores || {})[q.id], isGap = typeof s === 'number' && s < q.max;
      var pill = typeof s === 'number' ? (s === q.max ? emailPill(s + '/' + q.max, '#1a7f37', '#e3f4e8') : emailPill(s + '/' + q.max, s === 0 ? '#c62828' : '#b26a00', s === 0 ? '#fde8e8' : '#fff1d6')) : emailPill('–', '#667085', '#eef0f5');
      h.push('<tr' + (isGap ? ' bgcolor="#fff8f8"' : '') + '><td width="38" valign="top" style="padding:8px 6px 8px 10px;border-top:1px solid #eef0f5;color:#667085;font-weight:bold">' + q.id + (q.crit ? '<span style="color:#c62828">*</span>' : '') + '</td><td valign="top" style="padding:8px 6px;border-top:1px solid #eef0f5;color:#344054;line-height:1.35">' + emailEsc(q.text) + '</td><td width="70" align="right" valign="top" style="padding:8px 10px 8px 6px;border-top:1px solid #eef0f5">' + pill + '</td></tr>');
      if (!shown[q.id]) {
        var ph = ctx.photos(e, q.id);
        if (ph.length) h.push('<tr><td></td><td colspan="2" style="padding:0 10px 8px 6px">' + emailPhotoGrid(ph, ctx) + '</td></tr>');
      }
    });
    h.push('</table></td></tr>');
    }
    if (ctx.flushedNote && ctx.flushedNote(e)) h.push('<tr><td style="padding:8px 24px 0;font-size:12px;color:#98a2b3">' + emailEsc(ctx.flushedNote(e)) + '</td></tr>');
    h.push('<tr><td style="height:12px;font-size:0;line-height:0">&nbsp;</td></tr>');
  });
  h.push('<tr><td bgcolor="#f5f7fb" style="background:#f5f7fb;padding:14px 24px;font-size:12px;color:#667085;border-top:1px solid #e1e5ee">* Critical point (4 marks). Green 90% and above, amber 75 to 89, red below 75. Photos carry the date and time they were taken. The attached Excel workbook has the Summary, Detail, Shortfalls and Photos sheets.' + (ctx.note ? '<br>' + emailEsc(ctx.note) : '') + '</td></tr>');
  h.push('</table></td></tr></table>');
  return h.join('');
}
function otpEmailHtml(code) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef1f6"><tr><td align="center" style="padding:20px 8px"><table role="presentation" width="420" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:420px;background:#fff;border-radius:12px;border-collapse:separate;overflow:hidden;font-family:Arial,sans-serif"><tr><td bgcolor="#14285a" style="background:#14285a;padding:18px 22px;border-bottom:4px solid #f2b705;color:#fff;font-size:18px;font-weight:bold">Food Safety Audit</td></tr><tr><td style="padding:22px;color:#1f2937;font-size:15px">Your admin sign-in code is<div style="font-size:34px;font-weight:bold;letter-spacing:8px;color:#14285a;background:#f5f7fb;border-radius:10px;text-align:center;padding:14px;margin:14px 0">' + code + '</div><div style="font-size:13px;color:#667085">Valid for 10 minutes. If you did not ask for it, ignore this email.</div></td></tr></table></td></tr></table>';
}
