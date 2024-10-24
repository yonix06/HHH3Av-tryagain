import { Database } from '@/core/database'

async function updateNullUrls() {
  const db = Database.getUnprotected()

  const versionsWithNullUrl = await db.documentVersion.findMany({
    where: { url: null },
    include: { document: true }
  })

  console.log(`Found ${versionsWithNullUrl.length} document versions with NULL urls`)

  for (const version of versionsWithNullUrl) {
    const newUrl = `/documents/${version.document.id}/versions/${version.versionNumber}`
    
    await db.documentVersion.update({
      where: { id: version.id },
      data: { url: newUrl }
    })

    console.log(`Updated DocumentVersion ${version.id}: new URL is ${newUrl}`)
  }

  console.log('URL update process completed')
}

updateNullUrls().catch(console.error)
