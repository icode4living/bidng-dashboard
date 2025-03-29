import DefaultLayout from '@/components/Layouts/DefaultLayout';
import UpdatePasswordForm from '../../components/form/UpdatePasswordForm';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export default function AccountPage() {
  return (
    <div className="container mx-auto p-4">
        <DefaultLayout>
            <Breadcrumb pageName='Change Password' />
        <UpdatePasswordForm />
        </DefaultLayout>
    </div>
  );
}