'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  BarChartOutlined,
  EditOutlined,
  FileSearchOutlined,
  GlobalOutlined,
  SafetyOutlined,
  TeamOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `Création de documents simplifiée`,
      description: `Créez et gérez des documents officiels facilement, en économisant un temps précieux pour ce qui compte vraiment.`,
      icon: <EditOutlined />,
    },
    {
      heading: `Recherche et récupération intelligentes`,
      description: `Trouvez n'importe quel document en quelques secondes, pas en heures. Notre recherche intelligente met l'information à portée de main.`,
      icon: <FileSearchOutlined />,
    },
    {
      heading: `Sécurité conforme au RGPD`,
      description: `Dormez sur vos deux oreilles en sachant que vos données sensibles sont protégées par des mesures de sécurité de pointe.`,
      icon: <SafetyOutlined />,
    },
    {
      heading: `Cartographie interactive`,
      description: `Visualisez les décisions municipales sur Google Maps, apportant un contexte spatial à votre gouvernance.`,
      icon: <GlobalOutlined />,
    },
    {
      heading: `Contrôle d'accès basé sur les rôles`,
      description: `Assurez-vous que les bonnes personnes ont le bon accès grâce à notre système intuitif de permissions.`,
      icon: <TeamOutlined />,
    },
    {
      heading: `Analyses perspicaces`,
      description: `Obtenez des informations précieuses sur vos flux de documents et optimisez vos opérations municipales.`,
      icon: <BarChartOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Mayor Sarah Johnson`,
      designation: `City of Oakville`,
      content: `Ce système a révolutionné notre gestion des documents. Nous avons réduit notre temps de traitement des documents de 50% et amélioré considérablement la transparence.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `John Smith`,
      designation: `City Clerk, Maplewood`,
      content: `La fonctionnalité de cartographie est révolutionnaire. Elle a rendu nos réunions d'urbanisme beaucoup plus productives et engageantes.`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Emily Chen`,
      designation: `IT Director, Riverside Municipality`,
      content: `L'implémentation s'est déroulée en douceur, et la flexibilité du système nous permet de l'adapter à nos besoins spécifiques. C'est vraiment une solution conçue pour les gouvernements locaux.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: `Michael Brown`,
      designation: `Administrative Officer, Sunnyville`,
      content: `Le temps que nous économisons sur la gestion des documents est maintenant consacré à servir réellement nos citoyens. Cela a fait une réelle différence dans notre communauté.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: `Lisa Taylor`,
      designation: `Mayor's Assistant, Hillsborough`,
      content: `Les fonctionnalités de contrôle de version et de journal des modifications ont amélioré notre responsabilité. Nous pouvons maintenant retracer chaque décision facilement.`,
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
      name: `David Lee`,
      designation: `City Council Member, Brookside`,
      content: `En tant que personne peu férue de technologie, j'apprécie à quel point ce système est convivial. Il a grandement facilité mon travail.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  ]

  const navItems = [
    {
      title: `Fonctionnalités`,
      link: `#features`,
    },
    {
      title: `Tarification`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Essentiel`,
      description: `Parfait pour les petites municipalités`,
      monthly: 299,
      yearly: 3299,
      features: [
        `Jusqu'à 10 00 documents`,
        `Cartographie de base`,
        `Support par e-mail sous 48h`,
      ],
      highlight: true,
    },
    {
      title: `Professionnel`,
      description: `Idéal pour les villes de taille moyenne`,
      monthly: 599,
      yearly: 6599,
      features: [
        `Jusqu'à 50 00 documents`,
        `Cartographie avancée`,
        `Support prioritaire par email avec prise en main à distance au besoin`,
        `Intégrations personnalisées`,
      ],
    },
    {
      title: `Entreprise`,
      description: `Pour les grandes zones métropolitaines`,
      monthly: 999,
      yearly: 10999,
      features: [
        `Documents illimités`,
        `Ensemble complet de fonctionnalités`,
        `Support dédié 16/7 (hors astreinte)`,
        `Assistance complète à distance + Option sur site`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `Quel est le niveau de sécurité du système de gestion de documents ?`,
      answer: `Notre système est conçu avec la sécurité comme priorité absolue. Nous utilisons un chiffrement aux normes de l'industrie, des audits de sécurité réguliers, et sommes entièrement conformes au RGPD pour garantir que vos données municipales sensibles sont toujours protégées.`,
    },
    {
      question: `Pouvons-nous intégrer cela à nos systèmes existants ?`,
      answer: `Absolument ! Notre système est conçu pour être flexible et peut s'intégrer à une large gamme de logiciels municipaux existants. Notre équipe travaillera avec vous pour assurer une intégration en douceur et une migration des données.`,
    },
    {
      question: `Combien de temps prend généralement l'implémentation ?`,
      answer: `Le temps d'implémentation varie en fonction de la taille de votre municipalité et de la complexité de vos besoins. Cependant, la plupart de nos clients sont opérationnels en 4 à 6 semaines, y compris la formation et la migration des données.`,
    },
    {
      question: `Proposez-vous une formation pour notre personnel ?`,
      answer: `Oui, nous fournissons une formation complète dans le cadre de notre processus d'implémentation. Cela inclut des options en ligne et sur site, ainsi qu'un support continu pour s'assurer que votre équipe puisse tirer le meilleur parti de notre système.`,
    },
  ]

  const logos = [
    {
      url: 'https://vectorseek.com/wp-content/uploads/2023/09/Nextjs-Logo-Vector.svg-.png',
    },
    {
      url: 'https://dev.marblism.com/img/logofull.png',
    },
    { url: 'https://logos-world.net/wp-content/uploads/2020/11/GitHub-Emblem.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: `Inscription`,
      description: `Créez votre compte et parlez-nous des besoins de votre municipalité.`,
    },
    {
      heading: `Personnalisation`,
      description: `Nous adapterons le système pour répondre à vos exigences et flux de travail spécifiques.`,
    },
    {
      heading: `Migration`,
      description: `Nous transférerons en toute sécurité vos documents existants dans le nouveau système.`,
    },
    {
      heading: `Transformation`,
      description: `Observez comment votre gestion documentaire devient sans effort et efficace.`,
    },
  ]

  const painPoints = [
    {
      emoji: `🕵️`,
      title: `Des heures interminables passées à chercher des documents`,
    },
    {
      emoji: `🗄️`,
      title: `Submergé par les dossiers papier et le stockage numérique désorganisé`,
    },
    {
      emoji: `😓`,
      title: `Stress lié aux risques de conformité et aux préoccupations de sécurité des données`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Donnez du pouvoir à votre municipalité avec une gestion documentaire fluide`}
        subtitle={`Transformez l'efficacité et la transparence de votre gouvernement local avec notre système de gestion documentaire de pointe. Dites adieu au chaos administratif et bonjour à une gouvernance rationalisée.`}
        buttonText={`Commencez votre transformation`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/HHH3Av-tryagain-TV0M`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={10}
            suffixText={`de municipalités satisfaites`}
          />
        }
      />
      <LandingSocialProof
        logos={logos}
        title={`Fait confiance par les gouvernements locaux leaders`}
      />
      <LandingPainPoints
        title={`Les coûts cachés d'une gestion inefficace des documents : 19% du temps gouvernemental gaspillé`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Votre parcours vers une gestion documentaire municipale sans effort`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Libérez tout le potentiel de vos opérations municipales`}
        subtitle={`Notre suite complète de fonctionnalités est conçue pour répondre à tous les aspects de la gestion documentaire des gouvernements locaux, assurant efficacité, conformité et satisfaction des citoyens.`}
        features={features}
      />
      <LandingTestimonials
        title={`Histoires de réussite de municipalités comme la vôtre`}
        subtitle={`Découvrez comment les gouvernements locaux à travers le pays ont transformé leurs opérations avec notre système de gestion documentaire.`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Investissez dans l'efficacité, la transparence et une meilleure gouvernance`}
        subtitle={`Choisissez le plan qui correspond le mieux à la taille et aux besoins de votre municipalité. Tous les plans incluent nos fonctionnalités de base, des mises à jour régulières et un support dédié.`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Vos questions, nos réponses`}
        subtitle={`Nous sommes là pour vous aider à prendre la meilleure décision pour votre municipalité. Si vous ne voyez pas votre question ici, n'hésitez pas à nous contacter.`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Prêt à révolutionner votre gestion documentaire municipale ?`}
        subtitle={`Rejoignez le nombre croissant de gouvernements locaux qui économisent du temps, réduisent le stress et servent mieux leurs citoyens. Votre avenir efficace commence ici.`}
        buttonText={`Commencez maintenant`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
