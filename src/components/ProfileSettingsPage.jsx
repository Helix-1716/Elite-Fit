import { useState, useRef, useEffect } from 'react'
import { animate } from 'animejs'

const ProfileSettingsPage = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1990-01-15',
    gender: 'Male',
    address: '123 Fitness Street, Mumbai, Maharashtra 400001',
    emergencyContact: '+91 98765 43211',
    emergencyContactName: 'Jane Doe',
  })

  const [membershipInfo, setMembershipInfo] = useState({
    membershipId: 'ELT-2024-001234',
    plan: 'Premium',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    status: 'Active',
    autoRenew: true,
  })

  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    privacy: {
      showProfile: true,
      showProgress: false,
    },
  })

  const [profileImage, setProfileImage] = useState('/logo.png')
  const pageRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (pageRef.current) {
      animate(pageRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutExpo',
      })
    }
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (category, key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  const handleSave = () => {
    // Here you would typically save to Firebase or API
    setIsEditing(false)
    // Show success message
  }

  return (
    <div ref={pageRef} className="opacity-0">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your profile information and preferences</p>
      </div>

      {/* Profile Picture Section */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent-green/50 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 bg-accent-green text-dark-bg p-2 rounded-full cursor-pointer hover:bg-accent-green/90 transition-colors shadow-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
            <p className="text-gray-400 mb-4">{profileData.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-accent-green text-dark-bg font-semibold rounded-lg hover:bg-accent-green/90 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          {isEditing && (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-accent-green text-dark-bg font-semibold rounded-lg hover:bg-accent-green/90 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors"
              />
            ) : (
              <p className="text-white font-semibold">{profileData.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors"
              />
            ) : (
              <p className="text-white font-semibold">{profileData.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors"
              />
            ) : (
              <p className="text-white font-semibold">{profileData.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors"
              />
            ) : (
              <p className="text-white font-semibold">
                {new Date(profileData.dateOfBirth).toLocaleDateString()}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Gender</label>
            {isEditing ? (
              <select
                value={profileData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-white font-semibold">{profileData.gender}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Address</label>
            {isEditing ? (
              <textarea
                value={profileData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors resize-none"
              />
            ) : (
              <p className="text-white font-semibold">{profileData.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Membership Information */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Membership Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Membership ID</label>
            <p className="text-white font-semibold">{membershipInfo.membershipId}</p>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Plan</label>
            <span className="inline-block px-4 py-1 bg-accent-green/20 text-accent-green rounded-full text-sm font-semibold border border-accent-green/30">
              {membershipInfo.plan}
            </span>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Start Date</label>
            <p className="text-white font-semibold">
              {new Date(membershipInfo.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">End Date</label>
            <p className="text-white font-semibold">
              {new Date(membershipInfo.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Status</label>
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border ${
                membershipInfo.status === 'Active'
                  ? 'bg-accent-green/20 text-accent-green border-accent-green/30'
                  : 'bg-accent-red/20 text-accent-red border-accent-red/30'
              }`}
            >
              {membershipInfo.status}
            </span>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Auto Renew</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={membershipInfo.autoRenew}
                onChange={(e) =>
                  setMembershipInfo((prev) => ({ ...prev, autoRenew: e.target.checked }))
                }
                className="w-5 h-5 rounded border-2 border-gray-600 bg-dark-bg text-accent-green focus:ring-accent-green cursor-pointer"
              />
              <span className="text-white font-semibold">
                {membershipInfo.autoRenew ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Emergency Contact</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Contact Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors"
              />
            ) : (
              <p className="text-white font-semibold">{profileData.emergencyContactName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Contact Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors"
              />
            ) : (
              <p className="text-white font-semibold">{profileData.emergencyContact}</p>
            )}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="glass rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Preferences</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              {Object.entries(preferences.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-gray-300 capitalize">{key} Notifications</label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      handlePreferenceChange('notifications', key, e.target.checked)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-600 bg-dark-bg text-accent-green focus:ring-accent-green cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-dark-border pt-6">
            <h3 className="text-lg font-semibold mb-4">Privacy</h3>
            <div className="space-y-3">
              {Object.entries(preferences.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-gray-300">
                    {key === 'showProfile' ? 'Show Profile' : 'Show Progress'}
                  </label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      handlePreferenceChange('privacy', key, e.target.checked)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-600 bg-dark-bg text-accent-green focus:ring-accent-green cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingsPage
