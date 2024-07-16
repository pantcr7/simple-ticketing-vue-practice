import frappe

@frappe.whitelist()
def get_user_data():
    current_user = frappe.session.user
    user_data = frappe.db.get_value(
        "User", 
        current_user, 
        ["full_name", "user_image"], 
        as_dict=True
    )

    return user_data