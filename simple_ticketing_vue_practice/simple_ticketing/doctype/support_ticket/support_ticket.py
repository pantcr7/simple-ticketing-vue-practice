# Copyright (c) 2024, pp and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SupportTicket(Document):
	@frappe.whitelist()
	def mark_as_resolved(self):
		self.status = "Resolved"
		self.save()

