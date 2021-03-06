-- CREATE DB
USE [master]
GO

/****** Object:  Database [BodyComp]    Script Date: 9/24/2020 4:46:26 PM ******/
CREATE DATABASE [BodyComp]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BodyComp', FILENAME = N'C:\Users\johnc\BodyComp.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BodyComp_log', FILENAME = N'C:\Users\johnc\BodyComp_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BodyComp].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [BodyComp] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [BodyComp] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [BodyComp] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [BodyComp] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [BodyComp] SET ARITHABORT OFF 
GO

ALTER DATABASE [BodyComp] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [BodyComp] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [BodyComp] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [BodyComp] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [BodyComp] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [BodyComp] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [BodyComp] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [BodyComp] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [BodyComp] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [BodyComp] SET  DISABLE_BROKER 
GO

ALTER DATABASE [BodyComp] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [BodyComp] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [BodyComp] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [BodyComp] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [BodyComp] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [BodyComp] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [BodyComp] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [BodyComp] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [BodyComp] SET  MULTI_USER 
GO

ALTER DATABASE [BodyComp] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [BodyComp] SET DB_CHAINING OFF 
GO

ALTER DATABASE [BodyComp] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [BodyComp] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [BodyComp] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [BodyComp] SET QUERY_STORE = OFF
GO

USE [BodyComp]
GO

ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO

ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO

ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO

ALTER DATABASE [BodyComp] SET  READ_WRITE 
GO






-- CREATE DAY TABLE

USE [BodyComp]
GO

/****** Object:  Table [dbo].[Day]    Script Date: 9/24/2020 4:44:20 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Day](
	[DyId] [int] IDENTITY(1,1) NOT NULL,
	[DyDate] [date] NOT NULL,
	[DyCalories] [int] NULL,
	[DyMorningWeight] [float] NULL,
	[DyWeightUnitsId] [int] NULL,
	[DyBodyFatPercentage] [float] NULL,
	[DyMuscleMassPercentage] [float] NULL,
 CONSTRAINT [PK_Day] PRIMARY KEY CLUSTERED 
(
	[DyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO









-- CREATE WEIGHT TABLE

USE [BodyComp]
GO

/****** Object:  Table [dbo].[WeightUnits]    Script Date: 9/24/2020 4:44:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[WeightUnits](
	[WuId] [int] IDENTITY(1,1) NOT NULL,
	[WuName] [varchar](50) NOT NULL,
	[WuLabel] [varchar](50) NOT NULL,
 CONSTRAINT [PK_WeightUnits] PRIMARY KEY CLUSTERED 
(
	[WuId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


-- CREATE STAGING DAY TABLE
USE [BodyComp]
GO

/****** Object:  Table [dbo].[StagingBulkUpload]    Script Date: 9/24/2020 4:47:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StagingBulkUpload](
	[DyId] [int] IDENTITY(1,1) NOT NULL,
	[DyDate] [date] NOT NULL,
	[DyCalories] [int] NULL,
	[DyMorningWeight] [float] NULL,
	[DyWeightUnitsId] [int] NULL,
	[DyBodyFatPercentage] [float] NULL,
	[DyMuscleMassPercentage] [float] NULL,
 CONSTRAINT [PK_StagingBulkUpload] PRIMARY KEY CLUSTERED 
(
	[DyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO









-- weight table entries to be added
--WuId	WuName	WuLabel
-- 1	pounds	lbs
-- 2	kilograms	kg