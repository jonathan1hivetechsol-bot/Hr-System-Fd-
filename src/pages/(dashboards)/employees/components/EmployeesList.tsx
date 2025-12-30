import { Table, Button, Image } from 'react-bootstrap'
import { useState } from 'react'
import { useDashboard } from '@/context/useDashboard'
import EditEmployeeModal from '../../../(dashboards)/dashboard/components/EditEmployeeModal'
import { uploadAvatar } from '@/firebase'
import type { Employee } from '@/types/employee'

const EmployeesList = () => {
  const { employees, updateEmployee, deleteEmployee, canEditEmployee, canDeleteEmployee } = useDashboard()
  const [selected, setSelected] = useState<Employee | null>(null)
  const [showEdit, setShowEdit] = useState(false)

  const handleOpen = (emp: Employee) => {
    setSelected(emp)
    setShowEdit(true)
  }

  return (
    <div className="mt-4">
      <h5 className="mb-3">All Employees</h5>
      <Table responsive hover className="bg-white">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={emp.id}>
              <td>{idx + 1}</td>
              <td className="d-flex align-items-center gap-2">
                <Image src={emp.avatar} roundedCircle height={36} width={36} />
                <div>{emp.name}</div>
              </td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>
                {canEditEmployee(emp.id) ? (
                  <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleOpen(emp)}>View / Edit</Button>
                ) : (
                  <Button size="sm" variant="light" className="me-2" disabled>View</Button>
                )}
                {canDeleteEmployee() && (
                  <Button size="sm" variant="outline-danger" onClick={async () => { if (confirm('Delete employee?')) await deleteEmployee(emp.id) }}>Delete</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selected && (
        <EditEmployeeModal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          employee={selected}
          onSave={async (id, data, file, onProgress) => {
            try {
              let avatarUrl: string | undefined = undefined
              if (file) {
                const res = await uploadAvatar(id, file, (p) => {
                  if (onProgress) onProgress(p)
                })
                if (res.success) avatarUrl = res.data as string
              }
              const updateData: Partial<Employee> = { ...data }
              if (avatarUrl) updateData.avatar = avatarUrl
              await updateEmployee(id, updateData)
            } catch (err) {
              console.error(err)
              throw err
            }
          }}
        />
      )}
    </div>
  )
}

export default EmployeesList
