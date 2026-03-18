<?php

namespace App\Filament\Resources\Institutions\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class InstitutionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('country')
                    ->required(),
                TextInput::make('city')
                    ->required(),
                TextInput::make('type')
                    ->label('Institution Type')
                    ->placeholder('Hospital / University / Research Center'),
                TextInput::make('contact_person'),
                TextInput::make('email')
                    ->email(),
                TextInput::make('phone')
                    ->tel(),
                TextInput::make('website')
                    ->url(),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'Active' => 'Active',
                        'Pending' => 'Pending',
                        'Suspended' => 'Suspended',
                    ])
                    ->default('Active')
                    ->required(),
            ]);
    }
}
