const API_URL = '../../api';

document.addEventListener('DOMContentLoaded', loadOrders);

async function loadOrders() {
    try {
        const res = await fetch(`${API_URL}/admin.php`);

        if (res.status === 401) {
            alert('Unauthorized. Please login with admin/admin123');
            window.location.reload();
            return;
        }

        const orders = await res.json();

        if (orders.error) {
            throw new Error(orders.error);
        }

        const tbody = document.getElementById('orders-body');
        tbody.innerHTML = '';

        orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${order.id}</td>
                <td>${order.customer_email}<br><small>${order.customer_phone || ''}</small></td>
                <td>$${parseFloat(order.total_amount).toFixed(2)}</td>
                <td><span class="status-badge status-${order.status}">${order.status}</span></td>
                <td>${new Date(order.created_at).toLocaleDateString()}</td>
                <td>
                    <select onchange="updateStatus(${order.id}, this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="paid" ${order.status === 'paid' ? 'selected' : ''}>Paid</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById('loading').style.display = 'none';
        document.getElementById('orders-table').style.display = 'table';

    } catch (e) {
        document.getElementById('loading').innerText = 'Error loading orders: ' + e.message;
    }
}

window.updateStatus = async function(id, status) {
    if (!confirm('Update order status?')) return;

    try {
        const res = await fetch(`${API_URL}/admin.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_id: id, status: status })
        });
        const result = await res.json();
        if (result.success) {
            alert('Updated');
            loadOrders();
        } else {
            alert('Failed');
        }
    } catch (e) {
        alert('Error');
    }
};